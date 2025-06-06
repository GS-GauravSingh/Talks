import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
	connectedUsers: [],
	allUsers: [],
	messages: [], // stores messages of selected conversation/user
	selectedUser: null,
	isLoadingAllUsers: false,
	isLoadingConnectedUsers: false,
	isLoadingMessages: false,
	isSendingMessages: false,
	isCreatingConversation: false,
	showAllUsersComponent: false,

	// Method to fetch all the users
	getAllUsers: async () => {
		set({ isLoadingAllUsers: true });
		try {
			const response = await axiosInstance.get("/users");
			set({ allUsers: response.data?.result?.users?.rows });
		} catch (error) {
			console.error(
				"useChatStore(): getAllUsers(): error fetching all users: error: ",
				error
			);
			set({ isLoadingAllUsers: false });
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong"
			);
		} finally {
			set({ isLoadingAllUsers: false });
		}
	},

	// Method to fetch users who are connected with the currently logged-in user
	getConnectedUsers: async () => {
		set({ isLoadingConnectedUsers: true });
		try {
			const response = await axiosInstance.get("/conversations");
			set({ connectedUsers: response.data?.result?.conversations?.rows });
		} catch (error) {
			console.error(
				"useChatStore(): getConnectedUsers(): error fetching all users: error: ",
				error
			);
			set({ isLoadingConnectedUsers: false });
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong"
			);
		} finally {
			set({ isLoadingConnectedUsers: false });
		}
	},

	toggleShowAllUsersComponent: () => {
		const current = get().showAllUsersComponent;
		set({ showAllUsersComponent: !current });
	},

	setSelectedUser: (conversationDetail, setToNull = false) => {
		set({ messages: [] });

		if (setToNull) {
			set({ selectedUser: null });
		} else {
			const { authUser } = useAuthStore.getState(); // getState() will return an entire state object
			const isGroupChat = conversationDetail?.isGroupChat;
			const groupName = conversationDetail?.groupName ?? null;

			let users = conversationDetail?.Users?.filter(
				(user) => user.id !== authUser?.id
			);
			console.log(conversationDetail);
			set({
				selectedUser: {
					isGroupChat,
					groupName,
					users,
					conversationId: conversationDetail.id,
				},
			});
		}
	},

	getMessageHistory: async (conversationId) => {
		set({ isLoadingMessages: true });

		try {
			const response = await axiosInstance.get(
				`/message/${conversationId}`
			);

			set({ messages: response.data?.result?.messages?.rows });
			console.log(response);
		} catch (error) {
			console.error(
				"useChatStore(): getMessageHistory(): error fetching message history: error: ",
				error
			);
			set({ isLoadingMessages: false });
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong"
			);
		} finally {
			set({ isLoadingMessages: false });
		}
	},

	sendMessage: async (conversationId, formData) => {
		set({ isSendingMessages: true });

		try {
			const response = await axiosInstance.post(
				`/message/${conversationId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			set({
				messages: [...get().messages, response.data?.result?.messages],
			});
			console.log(response);
		} catch (error) {
			console.error(
				"useChatStore(): sendMessage(): error sending message: error: ",
				error
			);
			set({ isSendingMessages: false });
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong"
			);
		} finally {
			set({ isSendingMessages: false });
		}
	},

	startConveration: async (formData) => {
		const toastId = toast.loading("Connecting...");
		set({ isCreatingConversation: true });

		try {
			const response = await axiosInstance.post(
				"/conversation",
				formData
			);

			console.log(response);
			toast.success(response.data.message, {
				id: toastId,
			});
		} catch (error) {
			console.error(
				"useChatStore(): startConveration(): error creating conversation: error: ",
				error
			);
			set({ isCreatingConversation: false });
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);
		} finally {
			set({ isCreatingConversation: false });
		}
	},
}));

export default useChatStore;

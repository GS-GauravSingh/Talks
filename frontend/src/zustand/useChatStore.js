import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

const useChatStore = create((set, get) => ({
	connectedUsers: [],
	allUsers: [],
	messages: [], // stores messages of selected conversation/user
	selectedUser: null,
	isLoadingAllUsers: false,
	isLoadingConnectedUsers: false,
	isLoadingMessages: false,
	showAllUsersComponent: false,

	// Method to fetch all the users
	getAllUsers: async () => {
		set({ isLoadingAllUsers: true });
		try {
			const response = await axiosInstance.get("/users");
			set({ allUsers: response.data?.result?.users?.rows });
			console.log(response);
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
			set({ connectedUsers: response.data?.result?.conversations });
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
}));

export default useChatStore;

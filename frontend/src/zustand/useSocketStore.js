import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import useAuthStore from "./useAuthStore";

const useSocketStore = create((set, get) => ({
	// `set` is used to update the state
	// `get` is used to get the current state

	socket: null,
	onlineUsers: [],

	// SOCKET CONNECTION
	connectSocket: () => {
		const { authUser } = useAuthStore.getState();
		if (!authUser) {
			console.error("No authenticated user found to connect socket.");
			return;
		}

		// If socket is already connected, we don't need to connect again.
		// connected is a property of the socket object that indicates whether the socket is connected or not.
		if (get().socket?.connected) {
			console.log("Socket is already connected.");
			return;
		}

		// If socket is not connected, create a new socket connection.
		const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
			autoConnect: false, // prevents auto connection
			withCredentials: true, // allows cookies to be sent when making the WebSocket requests.
			query: {
				userId: authUser.id, // pass the user ID as a query parameter
			},
		});

		socket.connect();
		set({ socket: socket });
	},

	// DISCONNECT SOCKET
	disconnectSocket: () => {
		const { socket } = get();
		if (socket && socket.connected) {
			socket.disconnect();
			set({ socket: null });
			console.log("Socket disconnected successfully.");
		} else {
			console.warn("No active socket connection to disconnect.");
		}
	},

	// GET ONLINE USERS
	getOnlineUsers: () => {
		const { socket } = get();
		if (socket && socket.connected) {
			socket.on("ONLINE_USERS", (data) => {
				console.log("Online users: ", data.onlineUsers);
				set({ onlineUsers: data.onlineUsers });
			});
		} else {
			console.warn("No active socket connection to get online users.");
		}
	},
}));

export default useSocketStore;

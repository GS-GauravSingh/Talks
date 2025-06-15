import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Home, Signin, Signup, VerifyOTP } from "../pages";
import { AllUsers, Navbar, Profile, Settings } from "../sections";
import useAuthStore from "../zustand/useAuthStore";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import useThemeStore from "../zustand/useThemeStore";
import useChatStore from "../zustand/useChatStore";
import useSocketStore from "../zustand/useSocketStore";

function index() {
	const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
	const { socket, onlineUsers, connectSocket, getOnlineUsers } =
		useSocketStore();
	const { theme } = useThemeStore();
	const { showAllUsersComponent } = useChatStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		connectSocket();
	}, [authUser]);

	// useEffect(() => {
	// 	console.log(onlineUsers);
	// }, [onlineUsers])

	// Loading Screen
	if (isCheckingAuth && !authUser) {
		return <Loader />;
	}

	return (
		<div data-theme={theme} className="min-h-screen">
			{/* Navbar */}
			<Navbar />

			{/* App Routes */}
			<Routes>
				{/* Root Route */}
				<Route index element={<Navigate to={"/home"} />} />

				{/* Home Route */}
				<Route
					path="/home"
					element={
						authUser ? <Home /> : <Navigate to={"/auth/signin"} />
					}
				/>

				{/* Authentication Routes */}
				<Route
					path="/auth/signup"
					element={authUser ? <Navigate to={"/home"} /> : <Signup />}
				/>
				<Route
					path="/auth/verifyOTP"
					element={
						authUser ? <Navigate to={"/home"} /> : <VerifyOTP />
					}
				/>
				<Route
					path="/auth/signin"
					element={authUser ? <Navigate to={"/home"} /> : <Signin />}
				/>

				{/* Settings Page */}
				<Route path="/settings" element={<Settings />} />

				{/* Profile Page */}
				<Route path="/profile" element={<Profile />} />
			</Routes>

			{/* React-Hot-Toast */}
			<Toaster position="top-center" />

			{showAllUsersComponent && <AllUsers />}
		</div>
	);
}

export default index;

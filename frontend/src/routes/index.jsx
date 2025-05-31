import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Home, Signin, Signup, VerifyOTP } from "../pages";
import { Navbar } from "../sections";
import useAuthStore from "../zustand/useAuthStore";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";

function index() {
	const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// Loading Screen
	if (isCheckingAuth && !authUser) {
		return <Loader />;
	}

	return (
		<>
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
			</Routes>

			{/* React-Hot-Toast */}
			<Toaster position="top-center" />
		</>
	);
}

export default index;

import { create } from "zustand";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

// creating a store using `create`
const useAuthStore = create((set, get) => ({
	// `set` is used to update the state
	// `get` is used to get the current state

	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isLoggingOut: false,
	isUpdatingUser: false,

	// Indicates whether the app is checking if the user is authenticated or not (e.g., during app startup)
	isCheckingAuth: true,

	// CHECK AUTH - checks whether user is authenticated or not
	checkAuth: async () => {
		set({ isCheckingAuth: true });

		try {
			const response = await axiosInstance.get("/user/me");
			set({ authUser: response.data?.result?.user });
		} catch (error) {
			console.log(
				"useAuthStore(): checkAuth(): error checking authentication status: error: ",
				error
			);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	// REGISTER USER
	registerUser: async (formData, navigate) => {
		// Display a loading toast.
		// Each toast call returns a unique id.
		const toastId = toast.loading("Sending OTP...");
		set({ isSigningUp: true });

		try {
			const response = await axiosInstance.post("/auth/signup", formData);

			// Update the loading toast to success.
			toast.success(response.data.message, {
				id: toastId,
			});

			// Store the user email in the session storage, it helps in OTP verification.
			sessionStorage.setItem("userEmail", formData.email);

			// navigate user to the OTP verification page
			navigate("/auth/verifyOTP");
		} catch (error) {
			console.log("useAuthStore(): registerUser(): error: ", error);

			// Update the loading toast to error.
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isSigningUp: false });
		} finally {
			set({ isSigningUp: false });
		}
	},

	// VERIFY OTP
	verifyOTP: async (formData, navigate) => {
		const toastId = toast.loading("Verifying OTP...");
		set({ isSigningUp: true });

		try {
			const response = await axiosInstance.post(
				"/auth/verify-otp",
				formData
			);
			set({ authUser: response.data?.result?.user });

			// Update the loading toast to success.
			toast.success(response.data.message, {
				id: toastId,
			});

			// Delete the user email from the session storage once the OTP is verified.
			sessionStorage.removeItem("userEmail");

			navigate("/home");
		} catch (error) {
			console.log("useAuthStore(): verifyOTP(): error: ", error);

			// Update the loading toast to error.
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isSigningUp: false });
		} finally {
			set({ isSigningUp: false });
		}
	},

	// RESEND OTP
	resendOTP: async (formData) => {
		const toastId = toast.loading("Resending OTP...");
		set({ isSigningUp: true });

		try {
			const response = await axiosInstance.post(
				"/auth/resend-otp",
				formData
			);

			// Update the loading toast to success.
			toast.success(response.data.message, {
				id: toastId,
			});
		} catch (error) {
			console.log("useAuthStore(): resendOTP(): error: ", error);

			// Update the loading toast to error.
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isSigningUp: false });
		} finally {
			set({ isSigningUp: false });
		}
	},

	// LOGIN USER
	loginUser: async (formData, navigate) => {
		const toastId = toast.loading("Logging in...");
		set({ isLoggingIn: true });

		try {
			const response = await axiosInstance.post("/auth/login", formData);
			set({ authUser: response.data?.result?.user });

			toast.success(response.data.message, {
				id: toastId,
			});

			navigate("/home");
		} catch (error) {
			console.log("useAuthStore(): loginUser(): error: ", error);

			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isLoggingIn: false });
		} finally {
			set({ isLoggingIn: false });
		}
	},

	// LOGOUT USER
	logoutUser: async (navigate) => {
		const toastId = toast.loading("Logging out...");
		set({ isLoggingOut: true });

		try {
			const response = await axiosInstance.post("/auth/logout");
			set({ authUser: null });

			toast.success(response.data.message, {
				id: toastId,
			});

			navigate("/");
		} catch (error) {
			console.log("useAuthStore(): logoutUser(): error: ", error);

			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isLoggingOut: false });
		} finally {
			set({ isLoggingOut: false });
		}
	},

	// UPDATE USER AVATAR or Profile Pic
	updateUserAvatar: async (file) => {
		const toastId = toast.loading("Updating...");
		set({ isUpdatingUser: true });

		try {
			const response = await axiosInstance.patch("/user/avatar", file, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success(response.data.message, {
				id: toastId,
			});
		} catch (error) {
			console.log("useAuthStore(): updateUserAvatar(): error: ", error);

			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isUpdatingUser: false });
		} finally {
			set({ isUpdatingUser: false });
		}
	},

	googleAuthentication: async (formData, navigate) => {
		const toastId = toast.loading("Authenticating, please wait...");
		set({ isLoggingIn: true });

		try {
			const response = await axiosInstance.post(`/auth/google`, formData);
			console.log("Google Authentication Response: ", response);
			set({ authUser: response.data?.result?.user });

			toast.success(response.data.message, {
				id: toastId,
			});

			navigate("/home");
		} catch (error) {
			console.log("useAuthStore(): googleAuthentication(): error: ", error);

			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					"Something went wrong",
				{
					id: toastId,
				}
			);

			set({ isLoggingIn: false });
		} finally {
			set({ isLoggingIn: false });
		}
	},
}));

export default useAuthStore;

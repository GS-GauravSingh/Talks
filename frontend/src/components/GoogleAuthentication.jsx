import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../zustand/useAuthStore";
import { useNavigate } from "react-router";

function GoogleAuthentication() {
	const { googleAuthentication } = useAuthStore();
    const navigate = useNavigate();

	// Function to handle Google OAuth Response (success or error).
	const googleOAuthResponse = (authResult) => {
		try {
			console.log(authResult);
			if (authResult.code) {
				googleAuthentication({ code: authResult.code }, navigate);
			}
		} catch (error) {
			console.error("Error while requesting Google OAuth Code: ", error);
		}
		y;
	};

	// Google Login
	const handleGoogleLogin = useGoogleLogin({
		onSuccess: googleOAuthResponse, // Callback function that gets executed when the Google login is successful.
		onError: googleOAuthResponse, // Callback function triggered when there's an error during the Google login process.
		flow: "auth-code",
	});

	return (
		<button
			type="button"
			className="btn bg-white shadow-xl w-full"
			title="Google Authenticator"
			onClick={handleGoogleLogin}
		>
			<svg
				aria-label="Google logo"
				width="25"
				height="25"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<g>
					<path d="m0 0H512V512H0" fill="#fff"></path>
					<path
						fill="#34a853"
						d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
					></path>
					<path
						fill="#4285f4"
						d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
					></path>
					<path
						fill="#fbbc02"
						d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
					></path>
					<path
						fill="#ea4335"
						d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
					></path>
				</g>
			</svg>
		</button>
	);
}

export default GoogleAuthentication;

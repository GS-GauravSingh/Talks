import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuthentication from "./GoogleAuthentication";

function GoogleAuthenticationWrapper() {
	return (
		<GoogleOAuthProvider
			clientId={`${import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}`}
		>
			<GoogleAuthentication />
		</GoogleOAuthProvider>
	);
}

export default GoogleAuthenticationWrapper;

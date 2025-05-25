import axios from "axios";

//  `Axios.create()` is a handy feature within Axios used to create a new instance of Axios with a custom configuration.
const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1`, // set backend base URL
	withCredentials: true, // Allows cookies to be sent with the API request (usefull for authentication process)
	headers: {
		"Content-Type": "application/json", // Default content type
	},
});

// Axios interceptors are similar to middlewares in Express.js. Both allow you to modify or handle requests and responses before they reach their final destination.

// The following Axios response interceptor (since we are intercepting a response) intercepts every response received from the server.
// If the response is successful, it returns the response as is.
// If the response contains an error, it returns a rejected promise so that the error can be handled using .catch().
axiosInstance.interceptors.response.use(
	(response) => response, // Return response if successful
	(error) => Promise.reject(error) // Return rejected promise for errors and it ensure .catch() is triggered. Axios requests use Promises, so rejecting ensures that errors are properly handled in .catch().
);

export default axiosInstance;
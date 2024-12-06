import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { Dashboard, Signup, Login, Verification, ProfilePage } from "./pages";
import { useEffect } from "react";
import Layout from "./layout";

function AppRoutes() {
    // Setting up initial theme for application
    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem("theme"));
        const body = document.body;

        theme === "dark"
            ? body.classList.add("dark")
            : body.classList.remove("dark");
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/auth/login" />,
        },

        {
            path: "/dashboard",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <Dashboard />,
                },

                {
                    path: "profile", // we have to use relative path here.
                    element: <ProfilePage />
                }
            ],
        },

        {
            path: "/auth/signup",
            element: <Signup />,
        },
        {
            path: "/auth/login",
            element: <Login />,
        },
        {
            path: "/auth/verification",
            element: <Verification />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default AppRoutes;

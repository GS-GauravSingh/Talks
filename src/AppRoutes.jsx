import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Signup, Login } from "./pages";
import { useEffect } from "react";

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
            element: <Dashboard />,
        },
        {
            path: "/auth/signup",
            element: <Signup />,
        },
        {
            path: "/auth/login",
            element: <Login />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default AppRoutes;

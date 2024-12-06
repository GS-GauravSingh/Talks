import React from "react";
import commonStyles from "../commonStyles";
import { Navbar } from "../sections";
import { Outlet } from "react-router-dom";

function index() {
    return (
        <div className="h-screen overflow-hidden">
            <div
                className={`${commonStyles.bodyBackground} ${commonStyles.border} !border h-full w-full flex flex-row`}
            >
                {/* Navbar */}
                <Navbar />

                {/* To render children components - This <Outlet /> will be replace with the actual component. */}
                <Outlet />
            </div>
        </div>
    );
}

export default index;

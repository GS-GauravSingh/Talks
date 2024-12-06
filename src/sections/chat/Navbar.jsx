import React, { useState } from "react";
import commonStyles from "../../commonStyles";
import {
    Chat,
    ChatDots,
    DotsThreeCircle,
    Shapes,
    SignOut,
    UserCircle,
    Users,
} from "@phosphor-icons/react";
import { ThemeSwitcher } from "../../components";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const navigation = [
        {
            title: "DMs",
            icon: <Chat size={24} weight="regular" />,
            path: "/dashboard",
        },

        {
            title: "Profile",
            icon: <UserCircle size={24} weight="regular" />,
            path: "/dashboard/profile",
        },

        // {
        //     title: "Group",
        //     icon: <Users size={24} weight="regular" />,
        // },

        // {
        //     title: "More",
        //     icon: <DotsThreeCircle size={24} weight="regular" />,
        // },
    ];

    return (
        <nav
            className={`h-full max-h-full ${commonStyles.bodyBackground} px-4 py-4 flex flex-col items-center gap-4`}
        >
            <div className="flex flex-col items-center gap-2 cursor-default">
                <span
                    className={`bg-primary border-primary rounded-md text-white flex items-center justify-center p-2`}
                >
                    <Shapes size={30} weight="duotone" />
                </span>

                <span className="text-lg font-medium text-primary">
                    Workspace
                </span>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                {/* JavaScript */}
                {navigation.map((navItem, index) => {
                    const path = window.location.pathname;
                    let active = path === navItem.path;

                    return (
                        <div
                            key={index}
                            className={`flex flex-col justify-center items-center cursor-pointer group`}
                            onClick={() => {
                                navigate(navItem.path);
                            }}
                        >
                            <span
                                className={`${active && "text-white !border-primary !bg-primary"} ${commonStyles.border} p-2 rounded-md group-hover:bg-primary group-hover:border-primary group-hover:text-white `}
                            >
                                {navItem.icon}
                            </span>

                            <span
                                className={`${active && "text-primary"} text-sm group-hover:text-primary font-medium pt-1`}
                            >
                                {navItem.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Dummy container just to occupy extra space - flex grow */}
            <div className="flex-grow"></div>

            <div className="flex flex-col items-center justify-center gap-2">
                <ThemeSwitcher />

                <button
                    className={`p-2 rounded-md border-warning bg-warning text-white  hover:opacity-95 dark:hover:opacity-80`}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    <SignOut size={24} weight="regular" />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

import React, { useState } from "react";
import commonStyles from "../../commonStyles";
import {
    ChatDots,
    DotsThreeCircle,
    Shapes,
    SignOut,
    UserCircle,
    Users,
} from "@phosphor-icons/react";
import { ThemeSwitcher } from "../../components";

function Navbar() {
    const [active, setActive] = useState(0);
    const navigation = [
        {
            title: "DMs",
            icon: <ChatDots size={24} weight="regular" />,
        },

        {
            title: "Group",
            icon: <Users size={24} weight="regular" />,
        },

        {
            title: "Profile",
            icon: <UserCircle size={24} weight="regular" />,
        },

        {
            title: "More",
            icon: <DotsThreeCircle size={24} weight="regular" />,
        },
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
                    return (
                        <div
                            key={index}
                            className={`flex flex-col justify-center items-center cursor-pointer gap-1 group`}
                            onClick={() => {
                                setActive(index);
                            }}
                        >
                            <span
                                className={`${commonStyles.border} p-2 rounded-md group-hover:bg-primary group-hover:border-primary group-hover:text-white ${active === index && `bg-primary !border-primary text-white`}`}
                            >
                                {navItem.icon}
                            </span>

                            <h4
                                className={`text-sm group-hover:text-primary font-medium ${active === index && `text-primary`}`}
                            >
                                {navItem.title}
                            </h4>
                        </div>
                    );
                })}
            </div>

            {/* Dummy container just to occupy extra space - flex grow */}
            <div className="flex-grow"></div>

            <div className="flex flex-col items-center justify-center gap-2">
                <ThemeSwitcher />

                <span
                    className={`p-2 rounded-md cursor-pointer border-warning bg-warning text-white  hover:opacity-95 dark:hover:opacity-80`}
                >
                    <SignOut size={24} weight="regular" />
                </span>
            </div>
        </nav>
    );
}

export default Navbar;

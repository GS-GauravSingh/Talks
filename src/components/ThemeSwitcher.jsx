import React from "react";
import commonStyles from "../commonStyles";
import { Sun } from "@phosphor-icons/react";
import { MoonStars } from "@phosphor-icons/react/dist/ssr";
import useTheme from "../hooks/useTheme";

function ThemeSwitcher() {
    const [theme, setTheme] = useTheme();
    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <div
            className={`w-11 h-6  rounded-full bg-lightGray dark:bg-primary relative`}
        >
            <input
                type="checkbox"
                className="w-full h-full absolute z-9 opacity-0 cursor-pointer"
                onClick={toggleTheme}
            />

            <div
                className={`h-5 w-5 flex items-center justify-center absolute z-0 top-1/2 -translate-y-1/2 bg-white rounded-full ${theme === "light" ? "translate-x-[2px]" : "translate-x-[22px]"} transition duration-75 ease-linear`}
            >
                <span className="dark:hidden">
                    <Sun size={16} weight="bold" />
                </span>

                <span className="hidden dark:block">
                    <MoonStars size={16} weight="bold" />
                </span>
            </div>
        </div>
    );
}

export default ThemeSwitcher;

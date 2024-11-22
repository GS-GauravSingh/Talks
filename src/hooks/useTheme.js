import useLocalStorage from "./useLocalStorage";
import { useEffect, useState } from "react";

function useTheme() {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    useEffect(() => {
        const body = document.body;
        theme === "dark"
            ? body.classList.add("dark")
            : body.classList.remove("dark");
    }, [theme]);

    return [theme, setTheme];
}

export default useTheme;

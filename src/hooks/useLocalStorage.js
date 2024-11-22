import { useState } from "react";

function useLocalStorage(key, defaultValue) {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        } else {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    // Simple function to update our localstorage and state value.
    const updateLocalStorageAndStateValue = (valueOrFunc) => {
        let newValue;
        if (typeof valueOrFunc === "function") {
            const func = valueOrFunc;
            newValue = func(localStorageValue);
        } else {
            newValue = valueOrFunc;
        }

        localStorage.setItem(key, JSON.stringify(newValue));
        setLocalStorageValue(newValue);
    };

    return [localStorageValue, updateLocalStorageAndStateValue];
}

export default useLocalStorage;

import React, { useState } from "react";

function useLocalStorage(key, initialValue) {
	const [localStorageValue, setLocalStorageValue] = useState(() => {
		try {
			const storedValue = localStorage.getItem(key);
			if (storedValue) {
				return JSON.parse(storedValue);
			} else {
				localStorage.setItem(key, JSON.stringify(initialValue));
				return initialValue;
			}
		} catch (error) {
			localStorage.setItem(key, JSON.stringify(initialValue));
			return initialValue;
		}
	});

	// Function used to update the local storage and the state.
	function updateLocalStorageAndStateValue(valueOrFn) {
		let newValue;
		if (typeof valueOrFn === "function") {
			const fn = valueOrFn;
			newValue = fn(localStorageValue);
		} else {
			newValue = valueOrFn;
		}

		localStorage.setItem(key, JSON.stringify(newValue));
		setLocalStorageValue(newValue);
	}

	return [localStorageValue, updateLocalStorageAndStateValue];
}

export default useLocalStorage;

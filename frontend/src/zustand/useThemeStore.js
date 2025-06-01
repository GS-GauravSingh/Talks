import { create } from "zustand";

const useThemeStore = create((set, get) => ({
	theme: localStorage.getItem("talks-theme") || "night",
	setTheme: (theme) => {
		localStorage.setItem("talks-theme", theme);
		set({ theme: theme });
	},
}));

export default useThemeStore;

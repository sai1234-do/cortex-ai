import { create } from "zustand";

const THEMES = ["dark", "light", "midnight"];

export const useThemeStore = create((set) => ({

    theme: localStorage.getItem("theme") || "dark",

    setTheme: (theme) => {

        if (!THEMES.includes(theme)) return;

        localStorage.setItem("theme", theme);

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        set({ theme });

    }

}));
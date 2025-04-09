import { ThemeMode } from "@/app/app-slice";
import { RootState } from "@/app/store";

export const loadState = () => {
    try {
        const themeMode = localStorage.getItem("theme")
        return themeMode ? JSON.parse(themeMode) : undefined

    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

export const saveState = (state: RootState) => {
    try {
        const serializedStateTheme = JSON.stringify(state.app.themeMode);
        localStorage.setItem("theme", serializedStateTheme)
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};
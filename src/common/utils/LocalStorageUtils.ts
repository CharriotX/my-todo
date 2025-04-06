import { RootState } from "@/app/store";

export const loadState = () => {
    try {
        const appState = localStorage.getItem("app")
        return {
            app: appState ? JSON.parse(appState) : undefined,
        }
    } catch (err) {
        console.error('Could not load state from localStorage', err);
        return undefined;
    }
};

export const saveState = (state: RootState) => {
    try {
        const serializedStateTheme = JSON.stringify(state.app);
        localStorage.setItem("app", serializedStateTheme)
    } catch (err) {
        console.error('Could not save state to localStorage', err);
    }
};
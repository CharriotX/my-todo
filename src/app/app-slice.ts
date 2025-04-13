import { loadState } from "@/common/utils/LocalStorageUtils";
import { createSlice } from "@reduxjs/toolkit";

const savedTheme = loadState()

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: savedTheme || "light" as ThemeMode,
        requestStatus: 'succeeded' as RequestStatus,
        error: null as string | null
    },
    reducers: (create) => ({
        changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setRequestStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.requestStatus = action.payload.status
        }),
        setAppError: create.reducer<{ error: null | string }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
    selectors: {
        selectTheme: (state) => state.themeMode,
        selectRequestStatus: state => state.requestStatus,
        selectError: state => state.error
    }
})

export const { changeThemeMode, setRequestStatus, setAppError } = appSlice.actions
export const { selectTheme, selectRequestStatus, selectError } = appSlice.selectors


export type ThemeMode = "light" | "dark"
export type RequestStatus = 'loading' | 'succeeded' | 'rejected' | 'failed'
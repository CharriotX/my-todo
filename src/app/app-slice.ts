import { loadState } from "@/common/utils/LocalStorageUtils";
import { createSlice } from "@reduxjs/toolkit";

const savedTheme = loadState()

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: savedTheme || "light" as ThemeMode,
        requestStatus: 'succeeded' as RequestStatusType
    },
    reducers: (create) => ({
        changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setRequestStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
            state.requestStatus = action.payload.status
        })
    }),
    selectors: {
        selectTheme: (state) => state.themeMode,
        selectRequestStatus: state => state.requestStatus
    }
})

export const { changeThemeMode, setRequestStatus } = appSlice.actions
export const { selectTheme, selectRequestStatus } = appSlice.selectors


export type ThemeMode = "light" | "dark"
export type RequestStatusType = 'loading' | 'succeeded' | 'rejected'
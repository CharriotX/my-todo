import { RequestStatus } from "@/common/types/types";
import { loadState } from "@/common/utils/LocalStorageUtils";
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

const savedTheme = loadState()

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: savedTheme || "light" as ThemeMode,
        requestStatus: 'succeeded' as RequestStatus,
        error: null as string | null,
        isLoggedIn: false,
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
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }),
    extraReducers: builder => {
        builder
            .addMatcher(isPending, (state) => {
                state.requestStatus = 'loading'
            }
            )
            .addMatcher(isFulfilled, (state) => {
                state.requestStatus = "succesed"
            },
            )
            .addMatcher(
                isRejected, (state) => {
                    state.requestStatus = "failed"
                },
            )
    },
    selectors: {
        selectTheme: (state) => state.themeMode,
        selectRequestStatus: state => state.requestStatus,
        selectError: state => state.error,
        selectIsLoggedIn: state => state.isLoggedIn
    }
})

export const { changeThemeMode, setRequestStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectTheme, selectRequestStatus, selectError, selectIsLoggedIn } = appSlice.selectors


export type ThemeMode = "light" | "dark"

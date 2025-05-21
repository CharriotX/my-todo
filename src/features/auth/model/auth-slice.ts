import { createSliceWithThunks, handleAppError, handleCatchError } from "@/common/utils";
import { LoginArgs } from "../api/authApi.types";
import { setRequestStatus } from "@/app/app-slice";
import { authApi } from "../api/authApi";
import { ResultCode } from "@/common/enums";
import { AUTH_TOKEN } from "@/common/constants";
import { clearData } from "@/common/actions";


export const authSlice = createSliceWithThunks({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: create => ({
        login: create.asyncThunk(
            async (data: LoginArgs, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setRequestStatus({ status: "loading" }))
                    const res = await authApi.login(data)
                    if (res.data.resultCode === ResultCode.Success) {
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        dispatch(setRequestStatus({ status: "succeeded" }))
                        return { isLoggedIn: true }
                    } else {
                        dispatch(setRequestStatus({ status: "failed" }))
                        handleAppError({ data: res.data, dispatch })
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleCatchError({ error, dispatch })
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        logout: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setRequestStatus({ status: "loading" }))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        localStorage.removeItem(AUTH_TOKEN)
                        dispatch(setRequestStatus({ status: "succeeded" }))
                        dispatch(clearData())
                        return { isLoggedIn: false }
                    } else {
                        dispatch(setRequestStatus({ status: "failed" }))
                        handleAppError({ data: res.data, dispatch })
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleCatchError({ error, dispatch })
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                }
            }
        ),
        initializeApp: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setRequestStatus({ status: "loading" }))
                    const res = await authApi.me()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setRequestStatus({ status: "succeeded" }))
                        return { isLoggedIn: true }
                    } else {
                        dispatch(setRequestStatus({ status: "failed" }))
                        handleAppError({ data: res.data, dispatch })
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleCatchError({ error, dispatch })
                    return rejectWithValue(error)
                }
            }, {
            fulfilled: (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            }
        }
        )
    }),
    selectors: {
        selectIsLoggedIn: state => state.isLoggedIn
    }
})


export const { login, logout, initializeApp } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors
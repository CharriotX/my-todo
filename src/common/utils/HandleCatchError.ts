import { setAppError, setRequestStatus } from "@/app/app-slice"
import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

export const handleCatchError = (args: { error: unknown, dispatch: Dispatch }) => {
    const { error, dispatch } = args
    let errorMessage = "Something went wrong"

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message
    } else if (error instanceof Error) {
        errorMessage = error.message
    } else {
        errorMessage = JSON.stringify(error)
    }
    dispatch(setAppError({ error: errorMessage }))
    dispatch(setRequestStatus({ status: "failed" }))
}
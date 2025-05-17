import { setAppError, setRequestStatus } from "@/app/app-slice"
import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"
import { z } from "zod"

export const handleCatchError = (args: { error: unknown, dispatch: Dispatch }) => {
    const { error, dispatch } = args
    let errorMessage = "Something went wrong"

    switch (true) {
        case axios.isAxiosError(error):
            errorMessage = error.response?.data?.message || error.message
            break;
        case error instanceof Error:
            errorMessage = `Native error: ${error.message}`
            break;
        case error instanceof z.ZodError:
            console.table(error.issues)
            errorMessage = 'Zod error. Смотри консоль'
            break;
        default:
            errorMessage = JSON.stringify(error)
            break;
    }

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
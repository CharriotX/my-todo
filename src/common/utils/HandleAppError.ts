import { setAppError, setRequestStatus } from "@/app/app-slice"
import { Dispatch } from "@reduxjs/toolkit"
import { BaseResponse } from "../types/types"

export const handleAppError = <T>(args: { data: BaseResponse<T>, dispatch: Dispatch }) => {
    const { data, dispatch } = args
    const error = data.messages.length ? data.messages[0] : "Some error occurred"

    dispatch(setAppError({ error }))
    dispatch(setRequestStatus({ status: "failed" }))
}
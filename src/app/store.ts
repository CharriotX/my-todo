import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "../features/todolists/model/todolists-reduser";

const rootReducer = combineReducers({
    todolists: todolistsReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
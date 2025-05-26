import { tasksSlice } from "@/features/todolists/model/tasks-slice";
import { todolistSlice } from "@/features/todolists/model/todolists-slice";
import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";
import { saveState } from "@/common/utils/LocalStorageUtils";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [todolistSlice.name]: todolistSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
    [appSlice.name]: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
});

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

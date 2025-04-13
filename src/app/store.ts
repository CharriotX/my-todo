import { tasksSlice } from "@/features/todolists/model/tasks-slice";
import { todolistSlice } from "@/features/todolists/model/todolists-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";
import { saveState } from "@/common/utils/LocalStorageUtils";

const rootReducer = combineReducers({
  todolists: todolistSlice.reducer,
  tasks: tasksSlice.reducer,
  app: appSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

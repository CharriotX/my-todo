import { setRequestStatus } from "@/app/app-slice";
import { taskApi } from "../api/taskApi";
import { DomainTask, DomainTaskSchema, UpdateTaskModel } from "../api/taskApi.types";
import { todolistSlice } from "./todolists-slice";
import { createSliceWithThunks, handleAppError, handleCatchError } from "@/common/utils";
import { ResultCode } from "@/common/enums";



export const tasksSlice = createSliceWithThunks({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await taskApi.getTasks(todolistId);
          const tasks = DomainTaskSchema.array().parse(res.data.items)
          dispatch(setRequestStatus({ status: "succeeded" }))
          return { todolistId, tasks };
        } catch (error) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        }
      }),
    createTask: create.asyncThunk(
      async (args: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
        const { todolistId, title } = args;
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await taskApi.createTask(todolistId, title);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setRequestStatus({ status: "succeeded" }))
            return { task: res.data.data.item }
          } else {
            handleAppError({ data: res.data, dispatch })
            return rejectWithValue(null)
          }
        } catch (error: unknown) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      }, {
      fulfilled: (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      }
    }),
    deleteTask: create.asyncThunk(
      async (args: { todolistId: string, taskId: string }, { dispatch, rejectWithValue }) => {
        const { todolistId, taskId } = args;
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await taskApi.deleteTask(todolistId, taskId);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setRequestStatus({ status: "succeeded" }))
            return { todolistId, taskId }
          } else {
            handleAppError({ data: res.data, dispatch })
            return rejectWithValue(null)
          }
        } catch (error) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      }, {
      fulfilled: (state, action) => {
        const { todolistId, taskId } = action.payload
        state[todolistId] = state[todolistId].filter(task => task.id !== taskId);
      }
    }),
    updateTask: create.asyncThunk(
      async (args: { todolistId: string, taskId: string, task: UpdateTaskModel }, { dispatch, rejectWithValue }) => {
        const { todolistId, taskId, task } = args
        const model: UpdateTaskModel = {
          ...task
        }
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await taskApi.updateTask(todolistId, taskId, model);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setRequestStatus({ status: "succeeded" }))
            return { task: res.data.data.item }
          } else {
            handleAppError({ data: res.data, dispatch })
            return rejectWithValue(null)
          }
        } catch (error: unknown) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const allTasks = state[action.payload.task.todoListId]
          const taskIndex = allTasks.findIndex(task => task.id === action.payload.task.id)
          if (taskIndex !== -1) {
            allTasks[taskIndex] = action.payload.task
          }
        }
      })
  }),
  extraReducers: builder => {
    builder.addCase(
      todolistSlice.actions.createTodolist.fulfilled,
      (state, action) => {
        if (action.payload?.todolist) {
          state[action.payload.todolist.id] = [];
        }
      }
    ),
      builder.addCase(
        todolistSlice.actions.deleteTodolist.fulfilled,
        (state, action) => {
          if (action.payload?.todolistId !== undefined) {
            delete state[action.payload.todolistId];
          }
        }
      );
  },
  selectors: {
    selectTasks: (state) => state,
  },
});


export const { fetchTasks, createTask, deleteTask, updateTask } = tasksSlice.actions;
export const { selectTasks } = tasksSlice.selectors;

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = {
  [key: string]: DomainTask[]
};

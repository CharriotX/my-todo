import { DomainTask } from "../api/taskApi.types";
import { createSliceWithThunks } from "@/common/utils";



export const tasksSlice = createSliceWithThunks({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: () => ({
    // fetchTasks: create.asyncThunk(
    //   async (todolistId: string, { dispatch, rejectWithValue }) => {
    //     try {
    //       dispatch(setRequestStatus({ status: "loading" }))
    //       const res = await _taskApi.getTasks(todolistId);
    //       const tasks = DomainTaskSchema.array().parse(res.data.items)
    //       dispatch(setRequestStatus({ status: "succesed" }))
    //       return { todolistId, tasks };
    //     } catch (error) {
    //       handleCatchError({ error, dispatch })
    //       return rejectWithValue(null);
    //     }
    //   },
    //   {
    //     fulfilled: (state, action) => {
    //       state[action.payload.todolistId] = action.payload.tasks;
    //     }
    //   }),
    //   createTask: create.asyncThunk(
    //     async (args: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
    //       const { todolistId, title } = args;
    //       try {
    //         dispatch(setRequestStatus({ status: "loading" }))
    //         const res = await _taskApi.createTask(todolistId, title);
    //         if (res.data.resultCode === ResultCode.Success) {
    //           dispatch(setRequestStatus({ status: "succesed" }))
    //           return { task: res.data.data.item }
    //         } else {
    //           handleAppError({ data: res.data, dispatch })
    //           return rejectWithValue(null)
    //         }
    //       } catch (error: unknown) {
    //         handleCatchError({ error, dispatch })
    //         return rejectWithValue(null);
    //       }
    //     }, {
    //     fulfilled: (state, action) => {
    //       state[action.payload.task.todoListId].unshift(action.payload.task)
    //     }
    //   }),
    //   deleteTask: create.asyncThunk(
    //     async (args: { todolistId: string, taskId: string }, { dispatch, rejectWithValue }) => {
    //       const { todolistId, taskId } = args;
    //       try {
    //         dispatch(setRequestStatus({ status: "loading" }))
    //         const res = await _taskApi.deleteTask(todolistId, taskId);
    //         if (res.data.resultCode === ResultCode.Success) {
    //           dispatch(setRequestStatus({ status: "succesed" }))
    //           return { todolistId, taskId }
    //         } else {
    //           handleAppError({ data: res.data, dispatch })
    //           return rejectWithValue(null)
    //         }
    //       } catch (error) {
    //         handleCatchError({ error, dispatch })
    //         return rejectWithValue(null);
    //       }
    //     }, {
    //     fulfilled: (state, action) => {
    //       const { todolistId, taskId } = action.payload
    //       state[todolistId] = state[todolistId].filter(task => task.id !== taskId);
    //     }
    //   }),
    //   updateTask: create.asyncThunk(
    //     async (args: { todolistId: string, taskId: string, task: UpdateTaskModel }, { dispatch, rejectWithValue }) => {
    //       const { todolistId, taskId, task } = args
    //       const model: UpdateTaskModel = {
    //         ...task
    //       }
    //       try {
    //         dispatch(setRequestStatus({ status: "loading" }))
    //         const res = await _taskApi.updateTask(todolistId, taskId, model);
    //         if (res.data.resultCode === ResultCode.Success) {
    //           dispatch(setRequestStatus({ status: "succesed" }))
    //           return { task: res.data.data.item }
    //         } else {
    //           handleAppError({ data: res.data, dispatch })
    //           return rejectWithValue(null)
    //         }
    //       } catch (error: unknown) {
    //         handleCatchError({ error, dispatch })
    //         return rejectWithValue(null);
    //       }
    //     },
    //     {
    //       fulfilled: (state, action) => {
    //         const allTasks = state[action.payload.task.todoListId]
    //         const taskIndex = allTasks.findIndex(task => task.id === action.payload.task.id)
    //         if (taskIndex !== -1) {
    //           allTasks[taskIndex] = action.payload.task
    //         }
    //       }
    //     })
  }),
  // extraReducers: builder => {
  //   builder.addCase(
  //     todolistSlice.actions.createTodolist.fulfilled,
  //     (state, action) => {
  //       if (action.payload?.todolist) {
  //         state[action.payload.todolist.id] = [];
  //       }
  //     }),
  //     builder.addCase(
  //       todolistSlice.actions.deleteTodolist.fulfilled,
  //       (state, action) => {
  //         if (action.payload?.todolistId !== undefined) {
  //           delete state[action.payload.todolistId];
  //         }
  //       }),
  //     builder.addCase(clearData, (_state, _action) => {
  //       return {}
  //     })
  // },
  selectors: {
    selectTasks: (state) => state,
  },

});

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = {
  [key: string]: DomainTask[]
};

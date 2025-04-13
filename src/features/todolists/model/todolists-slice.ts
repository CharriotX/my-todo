import { setRequestStatus } from "@/app/app-slice";
import { todolistApi } from "../api/todolistApi";
import { Todolist } from "../api/todolistApi.types";
import { createSliceWithThunks, handleAppError, handleCatchError } from "@/common/utils";
import { RequestStatus } from "@/common/types/types";
import { ResultCode } from "@/common/enums";

export const todolistSlice = createSliceWithThunks({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    setTodolists: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await todolistApi.getTodolists();
          dispatch(setRequestStatus({ status: "succeeded" }))
          return { todolists: res.data };
        } catch (error) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((todo) =>
            state.push({ ...todo, filter: "all", entityStatus: "idle" })
          );
        },
      }
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await todolistApi.createTodolist(title);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setRequestStatus({ status: "succeeded" }))
            return { todolist: res.data.data.item };
          } else {
            handleAppError({ data: res.data, dispatch })
            rejectWithValue(null)
          }
        } catch (error) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload?.todolist !== undefined) {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
          }
        },
      }
    ),
    deleteTodolist: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          dispatch(changeTodolistStatus({ status: "loading", todolistId }))
          const res = await todolistApi.deleteTodolist(todolistId);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setRequestStatus({ status: "succeeded" }))
            dispatch(changeTodolistStatus({ status: "idle", todolistId }))
            return { todolistId };
          } else {
            handleAppError({ data: res.data, dispatch })
            return rejectWithValue(null)
          }
        } catch (error) {
          handleCatchError({ error, dispatch })
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          return state.filter((todo) => todo.id !== action.payload?.todolistId);
        },
      }
    ),
    updateTodolistTitle: create.asyncThunk(
      async (args: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
        const { todolistId, title } = args
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await todolistApi.updateTodolistTitle(todolistId, title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setRequestStatus({ status: "succeeded" }))
            dispatch(changeTodolistStatus({ status: "idle", todolistId }))
            return { todolistId, title }
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
        if (action.payload) {
          const todo = state.find(todo => todo.id === action.payload?.todolistId)
          if (todo) {
            todo.title = action.payload.title
          }
        }
      },
    }),
    changeTodolistFilter: create.reducer<{
      todolistId: string;
      filter: FilterValues;
    }>((state, action) => {
      const { todolistId, filter } = action.payload;
      const todo = state.find((todo) => todo.id === todolistId);
      if (todo) {
        todo.filter = filter;
      }
    }),
    changeTodolistStatus: create.reducer<{ todolistId: string, status: RequestStatus }>((state, action) => {
      const { status, todolistId } = action.payload
      const todo = state.find(todo => todo.id === todolistId)
      if (todo) {
        todo.entityStatus = status
      }
    })
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const {
  setTodolists,
  createTodolist,
  deleteTodolist,
  changeTodolistFilter,
  updateTodolistTitle,
  changeTodolistStatus
} = todolistSlice.actions;
export const { selectTodolists } = todolistSlice.selectors;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus
};

export type FilterValues = "all" | "active" | "completed";

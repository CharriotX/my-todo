import { setRequestStatus } from "@/app/app-slice";
import { todolistApi } from "../api/todolistApi";
import { Todolist } from "../api/todolistApi.types";
import { createSliceWithThunks } from "@/common/utils";

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
        } catch (err) {
          console.log(err);
          rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((todo) =>
            state.push({ ...todo, filter: "all" })
          );
        },
      }
    ),
    createTodolist: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          const res = await todolistApi.createTodolist(title);
          dispatch(setRequestStatus({ status: "succeeded" }))
          return { todolist: res.data.data.item };
        } catch (err) {
          console.log(err);
          rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload?.todolist !== undefined) {
            state.unshift({ ...action.payload.todolist, filter: "all" });
          }
        },
      }
    ),
    deleteTodolist: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setRequestStatus({ status: "loading" }))
          await todolistApi.deleteTodolist(todolistId);
          dispatch(setRequestStatus({ status: "succeeded" }))
          return { todolistId };
        } catch (err) {
          rejectWithValue(null);
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
          await todolistApi.updateTodolistTitle(todolistId, title)
          dispatch(setRequestStatus({ status: "succeeded" }))
          return { todolistId, title }
        } catch (err) {
          rejectWithValue(null);
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
  updateTodolistTitle
} = todolistSlice.actions;
export const { selectTodolists } = todolistSlice.selectors;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = "all" | "active" | "completed";

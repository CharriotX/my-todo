import { Todolist } from "./todolistApi.types";
import { BaseResponse } from "@/common/types/types";
import { DomainTodolist } from "../model/todolists-slice";
import { baseApi } from "@/app/baseApi";

// export const _todolistApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("/todo-lists");
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>(`/todo-lists`, { title });
//   },
//   deleteTodolist(id: string) {
//     return instance.delete(`/todo-lists/${id}`)
//   },
//   updateTodolistTitle(id: string, title: string) {
//     return instance.put(`/todo-lists/${id}`, { title })
//   }
// };

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map(todo => ({ ...todo, filter: "all" })),
      providesTags: ["Todolist"]
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "todo-lists",
        method: "POST",
        body: { title }
      }),
      invalidatesTags: ["Todolist"]
    }),
    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"]
    }),
    updateTodolistTitle: build.mutation<BaseResponse<{}>, { id: string, title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: "PUT",
        body: { title }
      }),
    })
  }),
  overrideExisting: false,
})


export const { useCreateTodolistMutation, useGetTodolistsQuery, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } = todolistApi

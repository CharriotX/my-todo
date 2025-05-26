import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./taskApi.types";
import { BaseResponse } from "@/common/types/types";
import { baseApi } from "@/app/baseApi";
import { PAGE_SIZE } from "@/common/constants";

// export const _taskApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
//   },
//   createTask(todolistId: string, title: string) {
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
//   },
//   deleteTask(todolistId: string, taskId: string) {
//     return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
//   },
//   updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
//   }
// };

export const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string, params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE }
      }),
      providesTags: (_res, _err, todolistId) => [{ type: "Task", todolistId }]
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string, title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title }
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", todolistId }]
    }),
    deleteTask: build.mutation<void, { todolistId: string, taskId: string }>({
      query: ({ taskId, todolistId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", todolistId }],
    }),
    updateTask: build.mutation<BaseResponse<DomainTask>, { todolistId: string, taskId: string, model: UpdateTaskModel }>({
      query: ({ taskId, todolistId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: 'Task', todolistId }]
    })
  })
})

export const { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useGetTasksQuery } = taskApi

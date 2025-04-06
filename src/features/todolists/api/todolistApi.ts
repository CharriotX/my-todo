import { instance } from "@/common/instance/instance";
import { Todolist } from "./todolistApi.types";
import { BaseResponse } from "@/common/types/types";

export const todolistApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists");
  },
  createTodolist(title: string){
    return instance.post<BaseResponse<{item: Todolist}>>(`/todo-lists`, {title});
  },
  deleteTodolist(id: string){
    return instance.delete(`/todo-lists/${id}`)
  },
  updateTodolistTitle(id: string, title: string){
    return instance.put(`/todo-lists/${id}`, {title})
  }
};

import { RootState } from "../../app/store";
import { TodoType } from "../../components/todoList/TodoList";

export const selectTodolists = (state: RootState): TodoType[] => state.todolists
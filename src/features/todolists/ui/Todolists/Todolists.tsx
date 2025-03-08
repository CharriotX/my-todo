import { useAppSelector } from "@/common/hooks/useAppSelector";
import { TodoListItem } from "./TodolistItem/TodoListItem";
import styles from "@/features/todolists/ui/Todolists/TodoList.module.css"
import { selectTodolists } from "@/features/todolists/model/todolists-selector";

export type TodoStatusType = "Todo" | "In Progress" | "Completed"
export type FilterTaskType = "all" | "active" | "completed"
export type TodoTaskType = {
  id: string
  text: string
  isDone: boolean
}

export type TodolistType = {
  id: string
  title: string
  status: TodoStatusType
  filter: FilterTaskType
  todoTasks: TodoTaskType[]
}

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return (
    <div className={styles.todolists}>
      {todolists.map((list) => {
        return (
          <TodoListItem
            todolist={list}
          ></TodoListItem>
        );
      })}
    </div >
  );
};

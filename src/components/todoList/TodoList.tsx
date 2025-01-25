import styles from "./TodoList.module.css";
import { TodoListItem } from "../todoListItem/TodoListItem";
import { TodoType } from "../todoAreas/TodoAreas";
import { TodoStatusType } from "../todoArea/TodoArea";

export type FilterValueType = "all" | "active" | "completed";
type Props = {
  todoLists: TodoType[];
  changeStatus: (status: TodoStatusType, todoId: string) => void;
};

export const TodoList = ({ todoLists, changeStatus }: Props) => {
  return (
    <div className={styles.todoList}>
      {todoLists.map((list) => {
        return (
          <TodoListItem
            key={list.id}
            todoList={list}
            changeStatus={changeStatus}
          ></TodoListItem>
        );
      })}
    </div>
  );
};

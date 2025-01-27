import styles from "./TodoList.module.css";
import { TodoListItem } from "../todoListItem/TodoListItem";
import { TodoType } from "../todoAreas/TodoAreas";
import { TodoStatusType } from "../todoArea/TodoArea";

export type FilterValueType = "all" | "active" | "completed";
type Props = {
  todoLists: TodoType[];
  changeStatus: (status: TodoStatusType, todoId: string) => void;
  deleteTodo: (todoId: string) => void
};

export const TodoList = ({ todoLists, changeStatus, deleteTodo }: Props) => {
  return (
    <div className={styles.todoList}>
      {todoLists.map((list) => {
        return (
          <TodoListItem
            key={list.id}
            todoList={list}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
          ></TodoListItem>
        );
      })}
    </div>
  );
};

import styles from "./TodoList.module.css";
import { TodoListItem } from "../todoListItem/TodoListItem";
import { FilterTasksType, TodoStatusType, TodoType } from "../todoAreas/TodoAreas";

type Props = {
  todoLists: TodoType[];
  changeStatus: (payload: { status: TodoStatusType, todoId: string }) => void;
  changeTaskFilter: (payload: { todoId: string, filter: FilterTasksType }) => void
  createTask: (payload: { todoId: string, text: string }) => void
  deleteTask: (payload: { todoId: string, taskId: string }) => void
  deleteTodo: (todoId: string) => void
  selectTaskItem: (payload: { todoId: string, taskId: string, checked: boolean }) => void
  updateTodoTitle: (payload: { newTitle: string, todoId: string }) => void
};

export const TodoList = ({ todoLists, changeStatus, deleteTodo, changeTaskFilter, createTask, deleteTask, selectTaskItem, updateTodoTitle }: Props) => {
  return (
    <div className={styles.todoList}>
      {todoLists.map((list) => {
        return (
          <TodoListItem
            key={list.id}
            todoList={list}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
            createTask={createTask}
            deleteTask={deleteTask}
            selectTaskItem={selectTaskItem}
            changeTaskFilter={changeTaskFilter}
            updateTodoTitle={updateTodoTitle}
          ></TodoListItem>
        );
      })}
    </div>
  );
};

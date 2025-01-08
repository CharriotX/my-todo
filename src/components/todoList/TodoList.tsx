import { useState } from "react";
import styles from "./TodoList.module.css";
import { Container } from "../container/Container";
import { TodoListItem } from "../todoListItem/TodoListItem";

export type TaskType = {
  id: number;
  title: string;
  taskItems: TaskItem[];
};

export type TaskItem = {
  id: number;
  text: string;
  isDone: boolean;
};

export type FilterValueType = "all" | "active" | "completed";

export const TodoList = () => {
  const [filter, setFilter] = useState<FilterValueType>("all");
  const [tasks, setTasks] = useState<Array<TaskItem>>([
    { id: 1, text: "WoW", isDone: true },
    { id: 2, text: "Dota", isDone: true },
    { id: 3, text: "Sekiro", isDone: false },
  ]);

  const deleteTaskItem = (itemId: number) => {
    setTasks(tasks.filter((item) => item.id !== itemId));
  };

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  let filteredTask: Array<TaskItem> = tasks;
  if (filter === "active") {
    filteredTask = tasks.filter((tasks) => !tasks.isDone);
  }
  if (filter === "completed") {
    filteredTask = tasks.filter((task) => task.isDone);
  }

  return (
    <Container>
      <div className={styles.todoList}>
        <TodoListItem
          title="Games"
          taskItems={filteredTask}
          deleteTaskItem={deleteTaskItem}
          changeFilter={changeFilter}
        ></TodoListItem>
      </div>
    </Container>
  );
};

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
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {
      id: 1,
      title: "Games",
      taskItems:[
        { id: 1, text: "WoW", isDone: true },
        { id: 2, text: "Dota", isDone: true },
        { id: 3, text: "Sekiro", isDone: false },
      ]
    },
    {
      id: 2,
      title: "Films",
      taskItems:[
        { id: 4, text: "Harry Potter", isDone: true },
        { id: 5, text: "The Gentlemens", isDone: true },
        { id: 6, text: "Lord of the Rings", isDone: false },
      ]
    },
  ]);

  return (
    <Container>
      <div className={styles.todoList}>
        {tasks.map(task => {
          return (
            <TodoListItem
              key={task.id}
              task={task}
            ></TodoListItem>
          )
        })}
      </div>
    </Container>
  );
};

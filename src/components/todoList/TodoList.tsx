import { Container } from "../container/Container";
import { TodoListItem } from "../todoListItem/TodoListItem";
import styles from "./TodoList.module.css";

export type Task = {
  id: number;
  text: string;
  isDone: boolean;
};

const task1: Task[] = [
  { id: 1, text: "WoW", isDone: true },
  { id: 2, text: "Dota", isDone: true },
  { id: 3, text: "Sekiro", isDone: false },
];

const task2: Task[] = [
  { id: 1, text: "Transformers", isDone: true },
  { id: 2, text: "HP", isDone: true },
  { id: 3, text: "The Accountant", isDone: false },
];

export const TodoList = () => {
  return (
    <Container>
      <div className={styles.todoList}>
        <TodoListItem title="Games" tasks={task1}></TodoListItem>
        <TodoListItem title="Films" tasks={task2}></TodoListItem>
      </div>
    </Container>
  );
};

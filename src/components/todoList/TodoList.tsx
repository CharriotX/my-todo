import { useState } from "react";
import styles from "./TodoList.module.css";
import { Container } from "../container/Container";
import { TodoListItem } from "../todoListItem/TodoListItem";
import { TodoListType } from "../todoAreas/TodoAreas";
import { Button } from "../button/Button";
import { TodoStatusType } from "../todoArea/TodoArea";

export type FilterValueType = "all" | "active" | "completed";
type Props = {
  todoLists: TodoListType[]
  changeStatus: (status: TodoStatusType, todoId: number) => void
}

export const TodoList = ({ todoLists, changeStatus }: Props) => {

  return (
    <Container>
      <div className={styles.todoList}>
        {todoLists.map(list => {
          return (
            <TodoListItem
              key={list.id}
              todoList={list}
              changeStatus={changeStatus}
            ></TodoListItem>
          )
        })}
      </div>
    </Container>
  );
};

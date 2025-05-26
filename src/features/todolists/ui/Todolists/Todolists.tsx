import { TodoListItem } from "./TodolistItem/TodoListItem";
import styles from "@/features/todolists/ui/Todolists/Todolists.module.css";
import { useGetTodolistsQuery } from "../../api/todolistApi";
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton";
import { Container } from "@/common/components/Container/Container";

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Container>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Container>
    )
  }

  return (
    <div className={styles.todolists}>
      {todolists?.map((list) => {
        return <TodoListItem todolist={list} key={list.id}></TodoListItem>;
      })}
    </div>
  );
};

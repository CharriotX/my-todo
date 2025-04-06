import { useAppSelector } from "@/common/hooks/useAppSelector";
import { TodoListItem } from "./TodolistItem/TodoListItem";
import styles from "@/features/todolists/ui/Todolists/Todolists.module.css";
import {
  selectTodolists,
  setTodolists,
} from "../../model/todolists-slice";
import { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTodolists());
  }, []);

  return (
    <div className={styles.todolists}>
      {todolists.map((list) => {
        return <TodoListItem todolist={list} key={list.id}></TodoListItem>;
      })}
    </div>
  );
};

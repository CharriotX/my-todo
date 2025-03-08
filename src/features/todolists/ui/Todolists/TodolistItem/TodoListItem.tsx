import { TodolistType } from "../Todolists";
import FilterButtons from "./FilterButtons/FilterButtons";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTaskAC } from "@/features/todolists/model/todolists-reduser";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import CreateTodoTaskForm from "@/common/components/createTodoItemForm/CreateTodoTaskForm";
import Tasks from "./Tasks/Tasks";
import styles from "./TodolistItem.module.css"

type Props = {
  todolist: TodolistType;
};

export const TodoListItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const createTask = (inputText: string) => {
    dispatch(createTaskAC({ todoId: todolist.id, taskTitle: inputText }));
  };

  return (
    <div className={styles.box}>
      <TodolistTitle todolist={todolist}></TodolistTitle>
      <CreateTodoTaskForm addItem={createTask} placeholder="New task"></CreateTodoTaskForm>
      <Tasks todolist={todolist}></Tasks>
      <FilterButtons todolist={todolist}></FilterButtons>
    </div >
  );
};

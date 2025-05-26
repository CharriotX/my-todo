import FilterButtons from "./FilterButtons/FilterButtons";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import Tasks from "./Tasks/Tasks";
import styles from "./TodolistItem.module.css"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice";
import CreateTodoTaskForm from "@/common/components/CreateTodoItemForm/CreateTodoTaskForm";

type Props = {
  todolist: DomainTodolist;
};

export const TodoListItem = ({ todolist }: Props) => {

  return (
    <div className={styles.box}>
      <TodolistTitle todolist={todolist}></TodolistTitle>
      <CreateTodoTaskForm todolistId={todolist.id} placeholder="New task"></CreateTodoTaskForm>
      <Tasks todolist={todolist}></Tasks>
      <FilterButtons todolist={todolist}></FilterButtons>
    </div >
  );
};

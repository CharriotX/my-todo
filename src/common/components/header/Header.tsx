import styles from "@/common/components/header/Header.module.css"
import { Button } from "@mui/material";
import { CreateTodoForm } from "../createTodoForm/CreateTodoForm";
import { Modal } from "../modal/Modal";
import { useState } from "react";
import { TodolistType } from "@/features/todolists/ui/Todolists/Todolists";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTodolistAC } from "@/features/todolists/model/todolists-reduser";

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const createTodo = (newTodo: TodolistType) => {
    dispatch(createTodolistAC({ newTodo }))
    setIsOpenModal(false)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <h2>Todo</h2>
        <div>
          <Button onClick={() => setIsOpenModal(true)}>Create todo</Button>
          <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
            <CreateTodoForm createTodo={createTodo}></CreateTodoForm>
          </Modal>
        </div>
      </nav>
    </header>
  );
};

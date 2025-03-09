import styles from "@/common/components/header/Header.module.css"
import { Modal } from "../modal/Modal";
import { useState } from "react";
import { TodolistType } from "@/features/todolists/ui/Todolists/Todolists";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTodolistAC } from "@/features/todolists/model/todolists-reduser";
import { Button } from "../button/Button";
import { CreateTodolistForm } from "../createTodolistForm/CreateTodolistForm";

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
        <div className={styles.buttonsBlock}>
          <Button onClick={() => setIsOpenModal(true)}>Create todo</Button>
        </div>
        <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
          <CreateTodolistForm createTodo={createTodo}></CreateTodolistForm>
        </Modal>
      </nav>
    </header>
  );
};

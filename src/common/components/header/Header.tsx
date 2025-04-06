import styles from "@/common/components/header/Header.module.css"
import { Modal } from "../modal/Modal";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { Button } from "../button/Button";
import { CreateTodolistForm } from "../createTodolistForm/CreateTodolistForm";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { changeThemeMode, selectRequestStatus, selectTheme } from "@/app/app-slice";
import LinearProgress from '@mui/material/LinearProgress';

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const theme = useAppSelector(selectTheme)
  const requesStatus = useAppSelector(selectRequestStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme]);

  const createTodo = () => {
    setIsOpenModal(prev => prev = false)
  }

  const toggleTheme = () => {
    dispatch(changeThemeMode({ themeMode: theme === "light" ? "dark" : "light" }))
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <h2>Todo</h2>
        <div className={styles.buttonsBlock}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Button onClick={() => setIsOpenModal(true)}>Create todo</Button>
        </div>
        <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
          <CreateTodolistForm createTodo={createTodo}></CreateTodolistForm>
        </Modal>
      </nav>
      {requesStatus === "loading" && <LinearProgress />}
    </header>
  );
};

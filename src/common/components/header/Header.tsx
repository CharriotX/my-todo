import styles from "@/common/components/header/Header.module.css"
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { Button } from "../Button/Button";
import { CreateTodolistForm } from "../CreateTodolistForm/CreateTodolistForm";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { changeThemeMode, selectRequestStatus, selectTheme } from "@/app/app-slice";
import LinearProgress from '@mui/material/LinearProgress';
import { NavLink } from "react-router";
import { Path } from "@/common/routing/Routing";
import { logout, selectIsLoggedIn } from "@/features/auth/model/auth-slice";

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const theme = useAppSelector(selectTheme)
  const requesStatus = useAppSelector(selectRequestStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
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

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <NavLink to={Path.Main}>
          <h2>Todo</h2>
        </NavLink>
        <div className={styles.buttonsBlock}>
          <Button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
          <Button onClick={() => setIsOpenModal(true)}>Create todo</Button>

          {isLoggedIn
            ? <Button onClick={logoutHandler}>Sign out</Button>
            : <Button>Sign in</Button>

          }
        </div>
        <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
          <CreateTodolistForm createTodo={createTodo}></CreateTodolistForm>
        </Modal>
      </nav>
      {requesStatus === "loading" && <LinearProgress />}
    </header>
  );
};

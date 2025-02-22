import { AppBar, IconButton, Modal, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderButton } from "./HeaderButton";
import { useState } from "react";
import { CreateTodoForm } from "../createTodoForm/CreateTodoForm";
import { TodoType } from "../todoList/TodoList";
import { createTodoListAC } from "../../model/todoList/todolists-reduser";

export const Header = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo
        </Typography>
        <HeaderButton color="inherit">Login</HeaderButton>
      </Toolbar>
    </AppBar>
  );
};

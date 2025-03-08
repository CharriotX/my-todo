import { ChangeEvent, useState } from "react";
import styles from "./CreateTodoForm.module.css"
import { Box, Button, IconButton, List, ListItem, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { nanoid } from "@reduxjs/toolkit";
import { TodolistType, TodoTaskType } from "@/features/todolists/ui/Todolists/Todolists";

type Props = {
  createTodo: (newTodo: TodolistType) => void
}

export const CreateTodoForm = ({ createTodo }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<TodoTaskType>>([]);
  const [errorText, setErrorText] = useState<string>("")

  const minTitleLenght = 5
  const maxTitleLenght = 25

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTaskList(taskList.map(item => item.id === name ? { ...item, text: value } : item))
  }

  const createTodoHandler = () => {
    if (title.trim() === "") {
      setErrorText("Empty title. Try more")
      return
    } else if (title.length < minTitleLenght || title.length > maxTitleLenght) {
      setErrorText(`Title must contains ${minTitleLenght} to ${maxTitleLenght} characters`)
      return
    }

    const filteredTasks = taskList.filter(item => item.text !== "")

    const newTodo: TodolistType = { id: nanoid(), status: "Todo", filter: "all", title: title, todoTasks: filteredTasks }
    createTodo(newTodo)
    setErrorText("")
    setTitle("")
    setTaskList([])
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setErrorText("")
  }

  const createTaskInputHandler = () => {
    if (taskList.length >= 6) {
      return
    } else {
      setTaskList([...taskList, { id: nanoid(), text: "", isDone: false }])
    }

  }

  const deleteTaskInputHandler = (taskId: string) => {
    setTaskList(taskList.filter(item => item.id !== taskId))
  }


  return (
    <div className={styles.form}>
      <Box display={"flex"} justifyContent={'center'} flexDirection={"column"} alignItems={"center"} gap={2}>
        <h3>Enter title</h3>
        <TextField label={"Title"} type="text" value={title} onChange={onChangeTitle} placeholder="Title..." error={errorText !== ''} helperText={errorText}></TextField>
      </Box>
      <Box marginTop={"20px"} display={"flex"} justifyContent={'center'} flexDirection={"column"} alignItems={"center"} >
        <Box display={"flex"} justifyContent={'center'} flexDirection={"column"} alignItems={"center"} gap={2} fontWeight="500">
          Task items
        </Box>
        <List>
          {taskList.map(value => {
            return (
              <ListItem key={value.id} >
                <Box marginRight={"20px"}>
                  <TextField size="small" label="Task" variant={"outlined"} placeholder="Task..." value={value.text} type="text" name={value.id} onChange={onChangeHandler}></TextField>
                </Box>
                <IconButton onClick={() => deleteTaskInputHandler(value.id)} >
                  <ClearIcon></ClearIcon>
                </IconButton>
              </ListItem>
            )
          })}
          <Box textAlign={"center"}>
            <Button size={"small"} variant="contained" color="primary" onClick={createTaskInputHandler} disabled={taskList.length >= 6}>More tasks</Button>
          </Box>
        </List>
      </Box>
      <div className={styles.createButton}>
        <Button variant="contained" color="primary" onClick={createTodoHandler}>Create todo</Button>
      </div>
    </div>
  );
};

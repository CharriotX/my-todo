import { TodoListItem } from "../todoListItem/TodoListItem";
import { Box, Button, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from "../modal/Modal";
import { CreateTodoForm } from "../createTodoForm/CreateTodoForm";
import { modalCreateTodoButtonSx } from "./Todolist.style";
import { Masonry } from "@mui/lab";
import { useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import { selectTodolists } from "../../model/todoList/todolists-selector";
import { changeStatusTodolistAC, changeTasksFilterAC, createTaskAC, createTodolistAC, deleteTaskAC, deleteTodolistAC, selectTaskAC, updateTodolistTitleAC } from "../../model/todoList/todolists-reduser";

export type TodoStatusType = "Todo" | "In Progress" | "Completed"
export type FilterTaskType = "all" | "active" | "completed"
export type TodoTaskType = {
  id: string
  text: string
  isDone: boolean
}

export type TodoType = {
  id: string
  title: string
  status: TodoStatusType
  filter: FilterTaskType
  todoTasks: TodoTaskType[]
}

export const TodoList = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const createTodo = (newTodo: TodoType) => {
    dispatch(createTodolistAC({ newTodo }))
    setIsOpenModal(false)
  }
  const deleteTodo = (todoId: string) => {
    dispatch(deleteTodolistAC({ todoId }))
  }
  const updateTodoTitle = (payload: { newTitle: string, todoId: string }) => {
    const { newTitle, todoId } = payload
    dispatch(updateTodolistTitleAC({ todoId, title: newTitle }))
  }
  const changeStatus = (payload: { status: TodoStatusType, todoId: string }) => {
    const { status, todoId } = payload
    dispatch(changeStatusTodolistAC({ todoId, status }))
  };

  const createTask = (payload: { todoId: string, taskTitle: string }) => {
    const { todoId, taskTitle } = payload
    dispatch(createTaskAC({ todoId, taskTitle }))
  }
  const deleteTask = (payload: { todoId: string, taskId: string }) => {
    const { todoId, taskId } = payload
    dispatch(deleteTaskAC({ todoId, taskId }))
  }
  const selectTaskItem = (payload: { todoId: string, taskId: string, checked: boolean }) => {
    const { todoId, taskId, checked } = payload
    dispatch(selectTaskAC({ todoId, taskId, checked }))
  }

  const changeTaskFilter = (payload: { todoId: string, filter: FilterTaskType }) => {
    const { todoId, filter } = payload
    dispatch(changeTasksFilterAC({ todoId, filter }))
  }



  return (
    <Container maxWidth={"xl"}>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3} sx={{ marginTop: "50px" }}>
        {todolists.map((list) => {
          return (
            <TodoListItem
              key={list.id}
              todoList={list}
              changeStatus={changeStatus}
              deleteTodo={deleteTodo}
              createTask={createTask}
              deleteTask={deleteTask}
              selectTaskItem={selectTaskItem}
              changeTaskFilter={changeTaskFilter}
              updateTodoTitle={updateTodoTitle}
            ></TodoListItem>
          );
        })}
      </Masonry >
      <Box sx={modalCreateTodoButtonSx}>
        <Button onClick={() => setIsOpenModal(true)} variant='contained' sx={{ padding: '15px 0' }}>
          <AddIcon></AddIcon>
        </Button>
        <Modal active={isOpenModal} setActive={setIsOpenModal}>
          <CreateTodoForm createTask={createTodo}></CreateTodoForm>
        </Modal>
      </Box>
    </Container >
  );
};

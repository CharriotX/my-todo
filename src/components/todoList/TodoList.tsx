import { TodoListItem } from "../todoListItem/TodoListItem";
import { useReducer, useState } from "react";
import { changeStatusTodolistAC, changeTasksFilterTodolistAC, createTaskAC, createTodoListAC, removeTaskAC, removeTodoListAC, selectTaskAC, todoListReducer, updateTodolistTitleAC } from "../../model/todoList/todolists-reduser";
import { v1 } from "uuid";
import { Box, Button, Container, Grid2 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from "../modal/Modal";
import { CreateTodoForm } from "../createTodoForm/CreateTodoForm";
import { modalCreateTodoButtonSx } from "./Todolist.style";
import { Masonry } from "@mui/lab";

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
  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todos, dispatchTodos] = useReducer(todoListReducer, [
    {
      id: todoListId_1,
      title: "Games",
      status: "Todo",
      filter: "all",
      todoTasks: [
        { id: v1(), text: "Dota", isDone: false },
        { id: v1(), text: "The Witcher", isDone: false },
        { id: v1(), text: "WoW", isDone: false }
      ]
    },
    {
      id: todoListId_2,
      title: "Films",
      status: "Todo",
      filter: "all",
      todoTasks: [
        { id: v1(), text: "Seven", isDone: false },
        { id: v1(), text: "Iron man", isDone: false },
        { id: v1(), text: "Tenet", isDone: false }
      ]
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const createTodo = (newTodo: TodoType) => {
    dispatchTodos(createTodoListAC(newTodo))
    setIsOpenModal(false)
  }
  const deleteTodo = (todoId: string) => {
    dispatchTodos(removeTodoListAC(todoId))
  }
  const updateTodoTitle = (payload: { newTitle: string, todoId: string }) => {
    const { newTitle, todoId } = payload
    dispatchTodos(updateTodolistTitleAC({ id: todoId, newTitle }))
  }
  const changeStatus = (payload: { status: TodoStatusType, todoId: string }) => {
    const { status, todoId } = payload
    dispatchTodos(changeStatusTodolistAC({ todoId, status }))
  };

  const createTask = (payload: { todoId: string, text: string }) => {
    const { todoId, text } = payload
    dispatchTodos(createTaskAC({ todoId, text }))
  }
  const deleteTask = (payload: { todoId: string, taskId: string }) => {
    const { todoId, taskId } = payload
    dispatchTodos(removeTaskAC({ todoId, taskId }))
  }
  const selectTaskItem = (payload: { todoId: string, taskId: string, checked: boolean }) => {
    const { todoId, taskId, checked } = payload
    dispatchTodos(selectTaskAC({ todoId, taskId, checked }))
  }

  const changeTaskFilter = (payload: { todoId: string, filter: FilterTaskType }) => {
    const { todoId, filter } = payload
    dispatchTodos(changeTasksFilterTodolistAC({ todoId, filter }))
  }



  return (
    <Container maxWidth={"xl"}>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3} sx={{ marginTop: "50px" }}>
        {todos.map((list) => {
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

import { useState } from "react";
import { TodoArea, TodoStatusType } from "../todoArea/TodoArea";
import styles from "./TodoAreas.module.css";
import { theme } from "../../styles/Theme";
import { Modal } from "../modal/Modal";
import { CreateTodoForm } from "./createTodoForm/CreateTodoForm";
import { Button } from "../button/Button";
import { v1 } from "uuid";

export type TodoType = {
  id: string;
  title: string;
  status: TodoStatusType;
  todoTasks: TodoTask[]
};

export type TodoTask = {
  id: string;
  text: string;
  isDone: boolean;
};

export const TodoAreas = () => {
  const [todos, setTodos] = useState<Array<TodoType>>([
    {
      id: v1(),
      title: "Games",
      status: "Todo",
      todoTasks: [
        { id: v1(), text: "Dota", isDone: false },
        { id: v1(), text: "The Witcher", isDone: false },
        { id: v1(), text: "WoW", isDone: false }
      ]
    },
    {
      id: v1(),
      title: "Films",
      status: "Todo",
      todoTasks: [
        { id: v1(), text: "Seven", isDone: false },
        { id: v1(), text: "Iron man", isDone: false },
        { id: v1(), text: "Tenet", isDone: false }
      ]
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const changeStatus = (status: TodoStatusType, todoId: string) => {
    const newState = todos.map(todo => todo.id === todoId ? { ...todo, status } : todo)
    setTodos(newState)
  };

  const createTask = (newTodo: TodoType) => {
    setTodos([...todos, newTodo])
    setIsOpenModal(false)
  }

  const deleteTodo = (todoId: string) => {
    setTodos(todos.filter(item => item.id !== todoId))
  }

  const todo = todos.filter(item => item.status === "Todo")
  const progress = todos.filter(item => item.status === "In Progress")
  const completed = todos.filter(item => item.status === "Completed")

  return (
    <div className={styles.todoAreas} >
      <TodoArea
        title="Todo"
        todoLists={todo}
        changeStatus={changeStatus}
        themeBg={theme.colors.todoStatusBg}
        deleteTodo={deleteTodo}
      ></TodoArea>
      <TodoArea
        title="In Progress"
        changeStatus={changeStatus}
        todoLists={progress}
        themeBg={theme.colors.inProgressStatusBg}
        deleteTodo={deleteTodo}
      ></TodoArea>
      <TodoArea
        title="Completed"
        changeStatus={changeStatus}
        todoLists={completed}
        themeBg={theme.colors.completeStatusBg}
        deleteTodo={deleteTodo}
      ></TodoArea>
      <div className={styles.addTaskButton}>
        <Button classes={styles.addButton} onClick={() => setIsOpenModal(true)}>+</Button>
        <Modal active={isOpenModal} setActive={setIsOpenModal}>
          <CreateTodoForm createTask={createTask}></CreateTodoForm>
        </Modal>
      </div>
    </div >
  );
};

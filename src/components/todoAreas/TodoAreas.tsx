import { useEffect, useState } from "react";
import { TodoArea, TodoStatusType } from "../todoArea/TodoArea";
import styles from "./TodoAreas.module.css";
import { theme } from "../../styles/Theme";
import { Modal } from "../modal/Modal";
import { CreateTodoForm } from "./createTodoForm/CreateTodoForm";
import { Button } from "../button/Button";

export type TodoType = {
  id: number;
  title: string;
  status: TodoStatusType;
  todoItems: TodoItem[];
};

export type TodoItem = {
  id: string;
  text: string;
  isDone: boolean;
};

export const TodoAreas = () => {
  const [todos, setTodos] = useState<Array<TodoType>>([
    {
      id: 1,
      title: "Games",
      status: "Todo",
      todoItems: [
        { id: "1", text: "WoW", isDone: false },
        { id: "2", text: "Dota", isDone: false },
        { id: "3", text: "Sekiro", isDone: false },
      ],
    },
    {
      id: 2,
      title: "Films",
      status: "Todo",
      todoItems: [
        { id: "4", text: "Harry Potter", isDone: false },
        { id: "5", text: "The Gentlemens", isDone: false },
        { id: "6", text: "Lord of the Rings", isDone: false },
      ],
    },
  ]);
  const [todoList, setTodoList] = useState<Array<TodoType>>([]);
  const [progressList, setProgressList] = useState<Array<TodoType>>([]);
  const [completedList, setCompletedList] = useState<Array<TodoType>>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  useEffect(() => {
    progressTodosHandler()
  }, [todos])

  const changeStatus = (status: TodoStatusType, todoId: number) => {
    const newState = todos.map(todo => todo.id === todoId ? { ...todo, status } : todo)
    setTodos(newState)
  };

  const progressTodosHandler = () => {
    let todo = todos.filter(item => item.status === "Todo");
    setTodoList(todo)
    let progress = todos.filter(item => item.status === "In Progress");
    setProgressList(progress)
    let completed = todos.filter(item => item.status === "Completed");
    setCompletedList(completed)
  };

  const createTask = (newTodo: TodoType) => {
    console.log(newTodo)
    setTodos([...todos, newTodo])
  }

  return (
    <div className={styles.todoAreas}>
      <TodoArea
        title="Todo"
        todoLists={todoList}
        changeStatus={changeStatus}
        themeBg={theme.colors.todoStatusBg}
      ></TodoArea>
      <TodoArea
        title="In Progress"
        changeStatus={changeStatus}
        todoLists={progressList}
        themeBg={theme.colors.inProgressStatusBg}
      ></TodoArea>
      <TodoArea
        title="Completed"
        changeStatus={changeStatus}
        todoLists={completedList}
        themeBg={theme.colors.completeStatusBg}
      ></TodoArea>
      <div className={styles.addTaskButton}>
        <Button classes={styles.addButton} onClickHandler={() => setIsOpenModal(true)}>+</Button>
        <Modal active={isOpenModal} setActive={setIsOpenModal}>
          <CreateTodoForm createTask={createTask}></CreateTodoForm>
        </Modal>
      </div>
    </div>
  );
};

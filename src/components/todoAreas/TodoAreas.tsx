import { useState } from "react";
import { TodoArea } from "../todoArea/TodoArea";
import styles from "./TodoAreas.module.css";
import { theme } from "../../styles/Theme";
import { Modal } from "../modal/Modal";
import { CreateTodoForm } from "./createTodoForm/CreateTodoForm";
import { Button } from "../button/Button";
import { v1 } from "uuid";

export type FilterTasksType = "all" | "active" | "completed";
export type TodoStatusType = "Todo" | "In Progress" | "Completed";
export type TodoType = {
  id: string;
  title: string;
  status: TodoStatusType;
  filter: FilterTasksType
  todoTasks: TodoTask[]
};

export type TodoTask = {
  id: string;
  text: string;
  isDone: boolean;
};

export type AreaType = {
  id: number
  status: TodoStatusType
  areaBackground: string
}

export const TodoAreas = () => {
  const todoListId_1 = v1()
  const todoListId_2 = v1()
  const todoAreasData: AreaType[] = [
    { id: 1, status: "Todo", areaBackground: theme.colors.todoStatusBg },
    { id: 2, status: "In Progress", areaBackground: theme.colors.inProgressStatusBg },
    { id: 3, status: "Completed", areaBackground: theme.colors.completeStatusBg }
  ]
  const [todos, setTodos] = useState<Array<TodoType>>([
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
    setTodos(prev => [...prev, newTodo])
    setIsOpenModal(false)
  }
  const deleteTodo = (todoId: string) => {
    setTodos(prev => prev.filter(item => item.id !== todoId))
  }
  const updateTodoTitle = (payload: { newTitle: string, todoId: string }) => {
    const { newTitle, todoId } = payload
    setTodos(prev => prev.map(item => item.id === todoId ? { ...item, title: newTitle } : item))
  }
  console.log(todos)
  const changeStatus = (payload: { status: TodoStatusType, todoId: string }) => {
    const { status, todoId } = payload
    setTodos(prev => prev.map(todo => todo.id === todoId ? { ...todo, status } : todo))
  };

  const createTask = (payload: { todoId: string, text: string }) => {
    const { todoId, text } = payload
    setTodos(prev => prev.map(todo => todo.id === todoId ? { ...todo, todoTasks: [...todo.todoTasks, { id: v1(), text, isDone: false }] } : todo))
  }
  const deleteTask = (payload: { todoId: string, taskId: string }) => {
    const { todoId, taskId } = payload
    setTodos(prev => prev.map(todo => todo.id === todoId ? { ...todo, todoTasks: todo.todoTasks.filter(task => task.id !== taskId) } : todo))
  }
  const selectTaskItem = (payload: { todoId: string, taskId: string, checked: boolean }) => {
    const { todoId, taskId, checked } = payload
    setTodos(prev => prev.map(todo => todo.id === todoId
      ? { ...todo, todoTasks: todo.todoTasks.map(task => task.id === taskId ? { ...task, isDone: checked } : task) }
      : todo))
  }

  const changeTaskFilter = (payload: { todoId: string, filter: FilterTasksType }) => {
    const { todoId, filter } = payload
    setTodos(prev => prev.map(todo => todo.id === todoId ?
      { ...todo, filter } : todo))
  }

  const todoAreas = todoAreasData.map(area => {
    const todoByStatus = todos.filter(item => item.status === area.status)

    return (
      <TodoArea
        key={area.id}
        title={area.status}
        todoLists={todoByStatus}
        createTask={createTask}
        deleteTask={deleteTask}
        changeStatus={changeStatus}
        themeBg={area.areaBackground}
        deleteTodo={deleteTodo}
        updateTodoTitle={updateTodoTitle}
        changeTaskFilter={changeTaskFilter}
        selectTaskItem={selectTaskItem}
      ></TodoArea >
    )
  })

  return (
    <div className={styles.todoAreas} >
      {todoAreas}
      <div className={styles.addTaskButton}>
        <Button classes={styles.addButton} onClick={() => setIsOpenModal(true)}>+</Button>
        <Modal active={isOpenModal} setActive={setIsOpenModal}>
          <CreateTodoForm createTask={createTodo}></CreateTodoForm>
        </Modal>
      </div>
    </div >
  );
};

import { useState } from "react";
import { TodoArea, TodoStatusType } from "../todoArea/TodoArea"
import styles from "./TodoAreas.module.css"
import { theme } from "../../styles/Theme";

export type TodoListType = {
    id: number;
    title: string;
    status: TodoStatusType,
    todoItems: TodoItem[];
};

export type TodoItem = {
    id: number;
    text: string;
    isDone: boolean;
};

export const TodoAreas = () => {
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {
            id: 1,
            title: "Games",
            status: "Todo",
            todoItems: [
                { id: 1, text: "WoW", isDone: true },
                { id: 2, text: "Dota", isDone: true },
                { id: 3, text: "Sekiro", isDone: false },
            ]
        },
        {
            id: 2,
            title: "Films",
            status: "Todo",
            todoItems: [
                { id: 4, text: "Harry Potter", isDone: true },
                { id: 5, text: "The Gentlemens", isDone: true },
                { id: 6, text: "Lord of the Rings", isDone: false },
            ]
        },
    ]);
    const [progressList, setProgressList] = useState<Array<TodoListType>>([]);
    const [completedList, setCompletedList] = useState<Array<TodoListType>>([]);

    const changeStatus = (status: TodoStatusType, todoId: number) => {
        if (status === "Todo") {
            let todo = todoList.find(item => {
                return item.id === todoId
            })
            if (todo !== undefined) {
                todo.status = "In Progress"
                setTodoList(todoList.filter(todo => todo.id !== todoId))
                setProgressList([...progressList, todo])
            }
        }
        if (status === "In Progress") {
            let todo = progressList.find(item => {
                return item.id === todoId
            })
            if (todo !== undefined) {
                todo.status = "Completed"
                setProgressList(progressList.filter(todo => todo.id !== todoId))
                setCompletedList([...completedList, todo])
            }
        }
    }

    return (
        <div className={styles.todoAreas}>
            <TodoArea title="Todo" todoLists={todoList} changeStatus={changeStatus} themeBg={theme.colors.todoStatusBg}></TodoArea>
            <TodoArea title="In Progress" changeStatus={changeStatus} todoLists={progressList} themeBg={theme.colors.inProgressStatusBg}></TodoArea>
            <TodoArea title="Completed" changeStatus={changeStatus} todoLists={completedList} themeBg={theme.colors.completeStatusBg}></TodoArea>
        </div>
    )
}

import { TodoList } from "../todoList/TodoList"
import { TodoListType } from "../todoAreas/TodoAreas"
import styles from "./TodoArea.module.css"

export type TodoStatusType = "Todo" | "In Progress" | "Completed";

type Props = {
    title: TodoStatusType,
    todoLists: TodoListType[],
    changeStatus: (status: TodoStatusType, todoId: number) => void
}

export const TodoArea = ({ title, todoLists, changeStatus }: Props) => {
    return (
        <div className={styles.todoArea}>
            <h2>{title}</h2>
            <TodoList todoLists={todoLists} changeStatus={changeStatus}></TodoList>
        </div>
    )
}

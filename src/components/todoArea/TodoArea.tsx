import { TodoList } from "../todoList/TodoList"
import { TodoType } from "../todoAreas/TodoAreas"
import styles from "./TodoArea.module.css"

export type TodoStatusType = "Todo" | "In Progress" | "Completed";

type Props = {
    title: TodoStatusType,
    todoLists: TodoType[],
    changeStatus: (status: TodoStatusType, todoId: number) => void
    themeBg: string
}

export const TodoArea = ({ title, todoLists, changeStatus, themeBg }: Props) => {
    return (
        <div className={styles.todoArea} style={{ background: `${themeBg}` }}>
            <h2>{title}</h2>
            <TodoList todoLists={todoLists} changeStatus={changeStatus}></TodoList>
        </div>
    )
}

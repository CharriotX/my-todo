import { TodoList } from "../todoList/TodoList"
import { FilterTasksType, TodoStatusType, TodoType } from "../todoAreas/TodoAreas"
import styles from "./TodoArea.module.css"

type Props = {
    title: TodoStatusType,
    todoLists: TodoType[],
    changeStatus: (payload: { status: TodoStatusType, todoId: string }) => void
    changeTaskFilter: (payload: { todoId: string, filter: FilterTasksType }) => void
    themeBg: string
    createTask: (payload: { todoId: string, text: string }) => void
    deleteTask: (payload: { todoId: string, taskId: string }) => void
    selectTaskItem: (payload: { todoId: string, taskId: string, checked: boolean }) => void
    deleteTodo: (todoId: string) => void
    updateTodoTitle: (payload: { newTitle: string, todoId: string }) => void
}

export const TodoArea = ({
    title, todoLists, changeStatus, themeBg, deleteTodo, changeTaskFilter, createTask, deleteTask, selectTaskItem, updateTodoTitle
}: Props) => {
    return (
        <div className={styles.todoArea} style={{ background: `${themeBg}` }}>
            <h2>{title}</h2>
            <TodoList
                todoLists={todoLists}
                updateTodoTitle={updateTodoTitle}
                changeStatus={changeStatus}
                deleteTodo={deleteTodo}
                changeTaskFilter={changeTaskFilter}
                createTask={createTask}
                deleteTask={deleteTask}
                selectTaskItem={selectTaskItem}>
            </TodoList>
        </div>
    )
}

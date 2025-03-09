import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { TodoTaskType } from "../../../Todolists"
import { deleteTaskAC, selectTaskAC, updateTaskTitleAC } from "@/features/todolists/model/todolists-reduser"
import { ChangeEvent } from "react"
import { Button } from "@/common/components/button/Button"
import { EditableInput } from "@/common/components/editableInput/EditableInput"
import styles from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.module.css"
import DeleteIcon from "@/common/theme/DeleteIcon"

type Props = {
    task: TodoTaskType
    todolistId: string
}

const TaskItem = ({ task, todolistId }: Props) => {
    const dispatch = useAppDispatch()

    const selectTask = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(selectTaskAC({ todoId: todolistId, taskId: task.id, checked: e.currentTarget.checked }))
    }
    const removeTask = () => {
        dispatch(deleteTaskAC({ todoId: todolistId, taskId: task.id }))
    }

    const updateTaskTitle = (newTitle: string) => {
        dispatch(updateTaskTitleAC({ todoId: todolistId, taskId: task.id, newTitle }))
    }


    return (
        <li className={styles.item}>
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => selectTask(e)}
            ></input>
            <div className={styles.itemText}>
                <EditableInput text={task.text} updateItem={updateTaskTitle} />
            </div>
            <div className={styles.itemButton}>
                <Button buttonType="remove" onClick={removeTask}>
                    <DeleteIcon></DeleteIcon>
                </Button>
            </div>
        </li>
    )
}

export default TaskItem
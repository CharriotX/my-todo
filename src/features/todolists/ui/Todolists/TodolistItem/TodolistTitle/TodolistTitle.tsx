import { EditableInput } from "@/common/components/editableInput/EditableInput"
import { TodolistType } from "../../Todolists"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { updateTodolistTitleAC } from "@/features/todolists/model/todolists-reduser"
import styles from "./TodolistTitle.module.css"

type Props = {
    todolist: TodolistType
}


export const TodolistTitle = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()

    const updateTodoTitle = (newTitle: string) => {
        dispatch(updateTodolistTitleAC({ newTitle, todoId: todolist.id }))
    }
    return (
        <div className={styles.box}>
            <EditableInput text={todolist.title} updateItem={updateTodoTitle}></EditableInput>
        </div>
    )
}

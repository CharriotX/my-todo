import { EditableInput } from "@/common/components/editableInput/EditableInput"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import styles from "./TodolistTitle.module.css"
import { Button } from "@/common/components/button/Button"
import DeleteIcon from "@/common/theme/DeleteIcon"
import { deleteTodolist, DomainTodolist, updateTodolistTitle } from "@/features/todolists/model/todolists-slice"

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()

    const updateTodoTitle = (newTitle: string) => {
        dispatch(updateTodolistTitle({todolistId: todolist.id, title: newTitle}))
    }

    const deleteTodo = () => {
        dispatch(deleteTodolist(todolist.id))
    }

    return (
        <div className={styles.box}>
            <EditableInput text={todolist.title} updateItem={updateTodoTitle}></EditableInput>
            <Button buttonType="remove" onClick={deleteTodo}>
                <DeleteIcon></DeleteIcon>
            </Button>
        </div>
    )
}

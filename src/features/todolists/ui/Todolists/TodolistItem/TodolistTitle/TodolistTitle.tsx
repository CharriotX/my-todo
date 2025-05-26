import { EditableInput } from "@/common/components/EditableInput/EditableInput"
import styles from "./TodolistTitle.module.css"
import { Button } from "@/common/components/Button/Button"
import DeleteIcon from "@/common/theme/DeleteIcon"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { todolistApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation, } from "@/features/todolists/api/todolistApi"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { RequestStatus } from "@/common/types/types"

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const dispatch = useAppDispatch()

    const changeTodolistStatus = (entityStatus: RequestStatus) => {
        dispatch(
            todolistApi.util.updateQueryData('getTodolists', undefined, (state) => {
                const todo = state.find(todo => todo.id === todolist.id)
                if (todo) {
                    todo.entityStatus = entityStatus
                }
            })
        )
    }

    const updateTodoTitle = (newTitle: string) => {
        updateTodolistTitle({ id: todolist.id, title: newTitle })
    }

    const deleteTodo = () => {
        changeTodolistStatus("loading")
        removeTodolist(todolist.id)
            .unwrap()
            .catch(() => {
                changeTodolistStatus('idle')
            })
    }

    return (
        <div className={styles.box}>
            <EditableInput text={todolist.title} updateItem={updateTodoTitle} disabled={todolist.entityStatus === "loading"}></EditableInput>
            <Button buttonType="remove" onClick={deleteTodo} disabled={todolist.entityStatus === "loading"}>
                <DeleteIcon></DeleteIcon>
            </Button>
        </div>
    )
}

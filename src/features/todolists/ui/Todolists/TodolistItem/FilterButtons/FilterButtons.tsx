import { Button } from '@/common/components/button/Button'
import { FilterTaskType, TodolistType } from '../../Todolists'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { changeTasksFilterAC, deleteTodolistAC } from '@/features/todolists/model/todolists-reduser'
import styles from "./FilterButtons.module.css"

type Props = {
    todolist: TodolistType
}

const FilterButtons = ({ todolist }: Props) => {
    const { id } = todolist
    const dispatch = useAppDispatch()

    const deleteTodo = () => {
        dispatch(deleteTodolistAC({ todoId: id }))
    }
    const changeFilter = (filter: FilterTaskType) => {
        dispatch(changeTasksFilterAC({ todoId: todolist.id, filter }))
    };

    return (
        <div className={styles.box}>
            {todolist.status === 'Completed'
                ? <Button onClick={deleteTodo} >Complete todo</Button>
                : <>
                    <Button
                        onClick={() => changeFilter("all")}
                        buttonType={todolist.filter === "all" ? "active" : "default"}
                    >
                        All
                    </Button>
                    <Button
                        onClick={() => changeFilter("active")}
                        buttonType={todolist.filter === "active" ? "active" : "default"}
                    >
                        Active
                    </Button>
                    <Button
                        onClick={() => changeFilter("completed")}
                        buttonType={todolist.filter === "completed" ? "active" : "default"}
                    >
                        Completed
                    </Button>
                </>
            }
        </div>
    )
}

export default FilterButtons
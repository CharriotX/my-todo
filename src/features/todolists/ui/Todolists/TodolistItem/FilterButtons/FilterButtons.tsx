import { Button } from "@/common/components/Button/Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import styles from "./FilterButtons.module.css";
import {
    DomainTodolist,
    FilterValues,
} from "@/features/todolists/model/todolists-slice";
import { todolistApi } from "@/features/todolists/api/todolistApi";

type Props = {
    todolist: DomainTodolist;
};

const FilterButtons = ({ todolist }: Props) => {
    const { id } = todolist;
    const dispatch = useAppDispatch();

    const changeFilter = (filter: FilterValues) => {
        dispatch(
            todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
                const todolist = state.find(todo => todo.id === id)
                if (todolist) {
                    todolist.filter = filter
                }
            })
        )
    };

    return (
        <div className={styles.box}>
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
        </div>
    );
};

export default FilterButtons;

import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { TodolistType, TodoTaskType } from "../../Todolists";
import TaskItem from "./TaskItem/TaskItem";
import { changeStatusTodolistAC } from "@/features/todolists/model/todolists-reduser";
import { useEffect } from "react";

type Props = {
    todolist: TodolistType
}

const Tasks = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        onStatusChange()
    }, [todolist.status])


    const onStatusChange = () => {
        if (todolist.todoTasks.length === 0) {
            return
        }
        if (todolist.todoTasks.every((task) => task.isDone === false)) {
            dispatch(changeStatusTodolistAC({ status: "Todo", todoId: todolist.id }));
        }
        if (todolist.todoTasks.some((task) => task.isDone === true)) {
            dispatch(changeStatusTodolistAC({ status: "In Progress", todoId: todolist.id }));
        }
        if (todolist.todoTasks.every((task) => task.isDone === true)) {
            dispatch(changeStatusTodolistAC({ status: "Completed", todoId: todolist.id }));
        }
    };

    let filteredTaskItems: TodoTaskType[] = todolist.todoTasks;
    if (todolist.filter === "active") {
        filteredTaskItems = todolist.todoTasks.filter((item) => !item.isDone);
    }
    if (todolist.filter === "completed") {
        filteredTaskItems = todolist.todoTasks.filter((item) => item.isDone);
    }

    return (
        <ul>
            {filteredTaskItems.length === 0 && <div>No tasks</div>}
            {filteredTaskItems.map((item) => {
                return (
                    <TaskItem task={item} todolistId={todolist.id} />
                );
            })}
        </ul >
    )
}

export default Tasks
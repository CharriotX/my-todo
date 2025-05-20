import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { Button } from "@/common/components/Button/Button";
import { EditableInput } from "@/common/components/EditableInput/EditableInput";
import styles from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.module.css";
import DeleteIcon from "@/common/theme/DeleteIcon";
import { DomainTask } from "@/features/todolists/api/taskApi.types";
import { deleteTask, updateTask } from "@/features/todolists/model/tasks-slice";
import { ChangeEvent } from "react";
import { TaskStatus } from "@/common/enums";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice";
import { Checkbox } from "@/common/components/Checkbox/Checkbox";

type Props = {
  task: DomainTask;
  todolist: DomainTodolist;
};

const TaskItem = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch();

  const selectTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTask({ todolistId: todolist.id, taskId: task.id, task: { ...task, status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New } }))
  }
  const updateTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTask({ todolistId: todolist.id, taskId: task.id, task: { ...task, title: newTitle } }))
  }
  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId: todolist.id, taskId: task.id }))
  }

  return (
    <li className={styles.item}>
      <Checkbox onChange={selectTaskHandler} checked={task.status === TaskStatus.Completed ? true : false}></Checkbox>
      <div className={styles.itemText}>
        <EditableInput text={task.title} updateItem={updateTaskTitleHandler} disabled={todolist.entityStatus === "loading"} />
      </div>
      <div className={styles.itemButton}>
        <Button buttonType="remove" onClick={deleteTaskHandler} disabled={todolist.entityStatus === "loading"}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;

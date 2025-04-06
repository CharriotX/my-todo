import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { Button } from "@/common/components/button/Button";
import { EditableInput } from "@/common/components/editableInput/EditableInput";
import styles from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.module.css";
import DeleteIcon from "@/common/theme/DeleteIcon";
import { DomainTask } from "@/features/todolists/api/taskApi.types";
import { deleteTask, updateTask } from "@/features/todolists/model/tasks-slice";
import { ChangeEvent } from "react";
import { TaskStatus } from "@/common/enums";

type Props = {
  task: DomainTask;
  todolistId: string;
};

const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();
  const selectTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTask({ todolistId, taskId: task.id, task: { ...task, status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New } }))
  }
  const updateTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTask({ todolistId, taskId: task.id, task: { ...task, title: newTitle } }))
  }
  const deleteTaskHandler = () => {
    dispatch(deleteTask({ todolistId, taskId: task.id }))
  }

  return (
    <li className={styles.item}>
      <input type="checkbox" onChange={selectTaskHandler} checked={task.status === TaskStatus.Completed ? true : false}></input>
      <div className={styles.itemText}>
        <EditableInput text={task.title} updateItem={updateTaskTitleHandler} />
      </div>
      <div className={styles.itemButton}>
        <Button buttonType="remove" onClick={deleteTaskHandler}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;

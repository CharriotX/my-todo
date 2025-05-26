import { Button } from "@/common/components/Button/Button";
import { EditableInput } from "@/common/components/EditableInput/EditableInput";
import styles from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.module.css";
import DeleteIcon from "@/common/theme/DeleteIcon";
import { DomainTask } from "@/features/todolists/api/taskApi.types";
import { ChangeEvent } from "react";
import { TaskStatus } from "@/common/enums";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice";
import { Checkbox } from "@/common/components/Checkbox/Checkbox";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/taskApi";

type Props = {
  task: DomainTask;
  todolist: DomainTodolist;
};

const TaskItem = ({ task, todolist }: Props) => {
  const [updateTask, { isLoading: isLoadingUpdate }] = useUpdateTaskMutation()
  const [deleteTask, { isLoading: isLoadingDelete }] = useDeleteTaskMutation()

  const selectTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const model = { ...task, status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.InProgress }
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const updateTaskTitleHandler = (title: string) => {
    const model = { ...task, title }
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }
  const deleteTaskHandler = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }

  return (
    <li className={styles.item}>
      <Checkbox onChange={selectTaskHandler} checked={task.status === TaskStatus.Completed ? true : false}></Checkbox>
      <div className={styles.itemText}>
        <EditableInput text={task.title} updateItem={updateTaskTitleHandler} disabled={isLoadingUpdate} />
      </div>
      <div className={styles.itemButton}>
        <Button buttonType="remove" onClick={deleteTaskHandler} disabled={isLoadingDelete || isLoadingUpdate}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;

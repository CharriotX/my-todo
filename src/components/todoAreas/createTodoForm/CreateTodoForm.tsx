import { ChangeEvent, useState } from "react";
import { Input } from "../../input/Input";
import { TodoTask, TodoType } from "../TodoAreas";
import { Button } from "../../button/Button";
import styles from "./CreateTodoForm.module.css"
import { v1 } from "uuid";

type Props = {
  createTask: (task: TodoType) => void
}

export const CreateTodoForm = ({ createTask }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<TodoTask>>([]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name
    setTaskList(taskList.map(item => item.id === name ? { ...item, text: value } : item))
  }

  const createTaskHandler = () => {
    const newTask: TodoType = { id: v1(), status: "Todo", title: title, todoTasks: taskList }
    createTask(newTask)
  }

  return (
    <div className={styles.form}>
      <div className={styles.formBlock}>
        <div className={styles.formLabel}>Enter title</div>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      </div>
      <div className={styles.taskBlock}>
        <div className={styles.formLabel}>
          Task items
        </div>
        <div>
          {taskList.map(value => {
            return (
              <Input key={value.id} value={value.text} type="text" name={value.id} onChange={onChangeHandler}></Input>
            )
          })}
        </div>
      </div>
      <div className={styles.createButton}>
        <Button onClick={createTaskHandler}>Create task</Button>
      </div>
    </div>
  );
};

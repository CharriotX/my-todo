import { ChangeEvent, useState } from "react";
import { Input } from "../../input/Input";
import { TodoItem, TodoType } from "../TodoAreas";
import { Button } from "../../button/Button";
import styles from "./CreateTodoForm.module.css"

type Props = {
  createTask: (task: TodoType) => void
}

export const CreateTodoForm = ({ createTask }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<TodoItem>>([
    { id: "111", text: "", isDone: false }
  ]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name
    setTaskList(taskList.map(item => item.id === name ? { ...item, text: value } : item))
  }

  const createTaskHandler = () => {
    const newTask: TodoType = { id: 22, status: "Todo", title: title, todoItems: taskList }
    createTask(newTask)
  }

  return (
    <form className={styles.form} onSubmit={createTaskHandler}>
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
        <Button onClickHandler={createTaskHandler}>Create task</Button>
      </div>
    </form>
  );
};

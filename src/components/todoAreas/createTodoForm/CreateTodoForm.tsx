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
  const [errorText, setErrorText] = useState<string>("")

  const minTitleLenght = 5
  const maxTitleLenght = 25

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTaskList(taskList.map(item => item.id === name ? { ...item, text: value } : item))
  }

  const createTaskHandler = () => {
    if (title.trim() === "") {
      setErrorText("Empty title. Try more")
      return
    } else if (title.length < minTitleLenght || title.length > maxTitleLenght) {
      setErrorText(`Title must contains ${minTitleLenght} to ${maxTitleLenght} characters`)
      return
    }

    const filteredTasks = taskList.filter(item => item.text !== "")

    const newTask: TodoType = { id: v1(), status: "Todo", title: title, todoTasks: filteredTasks }
    console.log(newTask);

    createTask(newTask)
    setErrorText("")
    setTitle("")
    setTaskList([])
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTitle(value)
  }

  const addTaskHandler = () => {
    setTaskList([...taskList, { id: v1(), text: "", isDone: false }])
  }

  const deleteTaskInputHandler = (taskId: string) => {
    setTaskList(taskList.filter(item => item.id !== taskId))
  }


  return (
    <div className={styles.form}>
      <div className={styles.titleBlock}>
        <div className={styles.formLabel}>Enter title</div>
        <Input type="text" value={title} onChange={onChangeTitle} placeholder="Title..."></Input>
      </div>
      {errorText !== "" && <div className={styles.errorText}>{errorText}</div>}
      <div className={styles.taskBlock}>
        <div className={styles.formLabel}>
          Task items
        </div>
        <ul className={styles.taskList}>
          {taskList.map(value => {
            return (
              <li className={styles.taskItem} key={value.id}>
                <Input placeholder="Task..." value={value.text} type="text" name={value.id} onChange={onChangeHandler}></Input>
                <span>
                  <Button onClick={() => deleteTaskInputHandler(value.id)}>X</Button>
                </span>
              </li>
            )
          })}
          <div>
            <Button onClick={addTaskHandler}>More tasks</Button>
          </div>
        </ul>
      </div>
      <div className={styles.createButton}>
        <Button onClick={createTaskHandler}>Create task</Button>
      </div>
    </div>
  );
};

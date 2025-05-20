import { ChangeEvent, useState } from "react";
import styles from "./CreateTodolistForm.module.css"
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTodolist } from "@/features/todolists/model/todolists-slice";

type Props = {
  createTodo: (title: string) => void
}

export const CreateTodolistForm = ({ createTodo }: Props) => {
  const [title, setTitle] = useState<string>("");
  // const [taskList, setTaskList] = useState<Array<CreateTodolistTasks>>([]);
  const [errorText, setErrorText] = useState<string | null>(null)
  const dispatch = useAppDispatch()


  const minTitleLenght = 5
  const maxTitleLenght = 25

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setTaskList(taskList.map(item => item.id === name ? { ...item, text: value } : item))
  // }

  const createTodoHandler = () => {
    if (title.trim() === "") {
      setErrorText("Empty title. Try more")
      return
    } else if (title.length < minTitleLenght || title.length > maxTitleLenght) {
      setErrorText(`Title must contains ${minTitleLenght} to ${maxTitleLenght} characters`)
      return
    }
    createTodo(title)
    dispatch(createTodolist(title))
    setErrorText(null)
    setTitle("")
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setErrorText(null)
  }

  return (
    <div className={styles.formBlock}>
      <div className={styles.titleBlock}>
        <h4>Enter title</h4>
        <Input type="text" value={title} onChange={onChangeTitle} placeholder="Title..."></Input>
      </div>
      <div className={styles.tasksBlock}>
        <h5>Task items</h5>
        {/* <ul>
          {taskList.map(value => {
            return (
              <li key={value.id} >
                <div>
                  <Input type="text" value={value.text} name={value.id} onChange={onChangeHandler}></Input>
                </div>
                <Button buttonType="remove" onClick={() => deleteTaskInputHandler(value.id)}>
                  <DeleteIcon></DeleteIcon>
                </Button>
              </li>
            )
          })}
          <div className={styles.createTaskButton}>
            <Button onClick={createTaskInputHandler} disabled={taskList.length >= 6}>More tasks</Button>
          </div>
        </ul> */}
      </div>
      <div className={styles.errorMessage}>
        {errorText && errorText}
      </div>
      <div className={styles.createButton}>
        <Button onClick={createTodoHandler}>Create todo</Button>
      </div>
    </div>
  );
};

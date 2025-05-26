import { ChangeEvent, useState } from "react";
import styles from "./CreateTodolistForm.module.css"
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

type Props = {
  onCreateTodo: (title: string) => void
}

export const CreateTodolistForm = ({ onCreateTodo: createTodo }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [errorText, setErrorText] = useState<string | null>(null)

  const minTitleLenght = 5
  const maxTitleLenght = 25

  const createTodoHandler = () => {
    if (title.trim() === "") {
      setErrorText("Empty title. Try more")
      return
    } else if (title.length < minTitleLenght || title.length > maxTitleLenght) {
      setErrorText(`Title must contains ${minTitleLenght} to ${maxTitleLenght} characters`)
      return
    }
    createTodo(title)
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

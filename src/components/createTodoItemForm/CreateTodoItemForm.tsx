import { ChangeEvent, useState } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import styles from "./CreateTodoItemForm.module.css";

type Props = {
  addItem: (inputText: string) => void
  disabled?: boolean
  placeholder?: string
};

const CreateTodoItemForm = ({ addItem, disabled, placeholder }: Props) => {

  const [inputText, setInputText] = useState<string>("")
  const [errorText, setErrorText] = useState<string>("")

  const minTitleLenght = 5
  const maxTitleLenght = 25

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
    setErrorText("")
  }

  const onCreateHandler = () => {
    if (inputText.trim() === "") {
      setErrorText("Empty title. Try more")
      return
    } else if (inputText.length < minTitleLenght || inputText.length > maxTitleLenght) {
      setErrorText(`Title must contains ${minTitleLenght} to ${maxTitleLenght} characters`)
      return
    }
    addItem(inputText)
    setInputText("")
    setErrorText("")
  }

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCreateHandler()
    }
  }

  return (
    <div className={styles.inputBlock} >
      <Input
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={onChange}
        onKeyDown={onPressEnter}
        disabled={disabled}
      />
      <span className={styles.errorText}>{errorText}</span>
      <Button styleType="active" onClick={onCreateHandler}>Add</Button>
    </div >
  );
};

export default CreateTodoItemForm;

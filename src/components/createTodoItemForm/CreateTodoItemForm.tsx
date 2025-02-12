import { ChangeEvent, useState } from "react";
import Button from '@mui/material/Button';
import styles from "./CreateTodoItemForm.module.css";
import { TextField } from "@mui/material";

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
      <TextField
        size={'small'}
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={onChange}
        onKeyDown={onPressEnter}
        disabled={disabled}
        label={'Task title'}
        error={errorText.length !== 0}
        helperText={errorText}
      />
      <Button onClick={onCreateHandler} disabled={disabled} variant='contained' size={'small'}>Add</Button>
    </div >
  );
};

export default CreateTodoItemForm;

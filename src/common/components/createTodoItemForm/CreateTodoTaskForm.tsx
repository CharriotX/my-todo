import { ChangeEvent, useState } from "react";
import styles from "./CreateTodoTaskForm.module.css"
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTask } from "@/features/todolists/model/tasks-slice";
type Props = {
  todolistId: string
  disabled?: boolean
  placeholder?: string
};

const CreateTodoTaskForm = ({ todolistId, disabled, placeholder }: Props) => {
  const [inputText, setInputText] = useState<string>("");
  const [errorText, setErrorText] = useState<null | string>(null);
  const dispatch = useAppDispatch()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
    setErrorText(null);
  };

  const onCreateHandler = () => {
    if (inputText.trim() === "") {
      setErrorText("Empty title. Try more");
      return;
    }
    dispatch(createTask({ todolistId, title: inputText }))
    setInputText("");
    setErrorText(null);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCreateHandler();
    }
  };

  return (
    <div className={styles.inputBlock}>
      <Input
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={onChange}
        onKeyDown={onPressEnter}
        disabled={disabled}
      />
      <div className={styles.errorBox}>{errorText && errorText}</div>
      <Button onClick={onCreateHandler} disabled={disabled}>
        Add
      </Button>
    </div>
  );
};

export default CreateTodoTaskForm;

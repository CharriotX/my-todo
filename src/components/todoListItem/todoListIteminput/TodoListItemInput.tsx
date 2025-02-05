import { ChangeEvent } from "react";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import styles from "./TodoListItemInput.module.css";

type Props = {
  taskInputTitle: string;
  onChangeTaskInputTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  createTaskOnEnterHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  createTaskHandler: () => void;
  disabled: boolean
};

const TodoListItemInput = ({
  taskInputTitle,
  onChangeTaskInputTitle,
  createTaskOnEnterHandler,
  createTaskHandler,
  disabled
}: Props) => {

  return (
    <div className={styles.inputBlock}>
      <Input
        type="text"
        placeholder="new task"
        value={taskInputTitle}
        onChange={onChangeTaskInputTitle}
        onKeyDown={createTaskOnEnterHandler}
        disabled={disabled}
      />
      <Button styleType="active" onClick={createTaskHandler}>Add</Button>
    </div>
  );
};

export default TodoListItemInput;

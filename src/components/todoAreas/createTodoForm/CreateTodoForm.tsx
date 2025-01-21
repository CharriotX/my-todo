import { useState } from "react";
import { Input } from "../../input/Input";
import { TodoItem } from "../TodoAreas";

export const CreateTodoForm = () => {
  const [title, setTitle] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<TodoItem>>([]);
  const [taskText, setTaskText] = useState<string>("");
  
  return (
    <form>
      <label>Enter title</label>
      <Input type="text" value={title}></Input>
      <div>
        <Input type="text" value={taskText}></Input>
        {taskList.length !== 0 &&
          taskList.map((task) => {
            return <div>{task.text}</div>;
          })}
      </div>
    </form>
  );
};

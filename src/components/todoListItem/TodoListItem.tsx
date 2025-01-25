import { ChangeEvent, useState } from "react";
import { Button } from "../button/Button";
import { FilterValueType } from "../todoList/TodoList";
import styles from "./TodoListItem.module.css";
import { TodoTask, TodoType } from "../todoAreas/TodoAreas";
import { TodoStatusType } from "../todoArea/TodoArea";
import TodoListItemInput from "./todoListIteminput/TodoListItemInput";
import { v1 } from "uuid";

type Props = {
  title?: string;
  todoList: TodoType;
  changeStatus: (status: TodoStatusType, todoId: string) => void;
};

export const TodoListItem = ({ todoList, changeStatus }: Props) => {
  const [taskItems, setTaskItems] = useState<TodoTask[]>(todoList.todoTasks);
  const [filter, setFilter] = useState<FilterValueType>("all");
  const [taskInputTitle, setTaskInputTitle] = useState<string>("");

  const deleteTaskItem = (itemId: string) => {
    setTaskItems(taskItems.filter((item) => item.id !== itemId));
  };

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  const createTaskHandler = () => {
    setTaskItems([
      ...taskItems,
      { id: v1(), text: taskInputTitle, isDone: false },
    ]);
    setTaskInputTitle("");
  };

  const onChangeTaskInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInputTitle(e.target.value);
  };

  const createTaskOnEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setTaskItems([
        ...taskItems,
        { id: "33", text: taskInputTitle, isDone: false },
      ]);
      setTaskInputTitle(" ");
    }
  };

  const onStatusChange = () => {
    if (taskItems.every((task) => task.isDone === false)) {
      changeStatus("Todo", todoList.id);
    }
    if (taskItems.some((task) => task.isDone === true)) {
      changeStatus("In Progress", todoList.id);
    }
    if (taskItems.every((task) => task.isDone === true)) {
      changeStatus("Completed", todoList.id);
    }
  };

  let filteredTaskItems: TodoTask[] = taskItems;
  if (filter === "active") {
    filteredTaskItems = taskItems.filter((item) => !item.isDone);
  }
  if (filter === "completed") {
    filteredTaskItems = taskItems.filter((item) => item.isDone);
  }

  const onSelectItem = (itemId: string, isDone: boolean) => {
    setTaskItems(
      taskItems.map((item) => {
        if (item.id === itemId) {
          item.isDone = !isDone;
          return item;
        } else {
          return item;
        }
      })
    );
    onStatusChange();
  };

  return (
    <div className={styles.todoListItem}>
      <h3 className={styles.itemTitle}>{todoList.title}</h3>
      <TodoListItemInput
        taskInputTitle={taskInputTitle}
        createTaskHandler={createTaskHandler}
        onChangeTaskInputTitle={onChangeTaskInputTitle}
        createTaskOnEnterHandler={createTaskOnEnterHandler}
      />
      <div>
        <ul className={styles.itemList}>
          {filteredTaskItems.map((item) => {
            const deleteTaskItemhandler = () => {
              deleteTaskItem(item.id);
            };
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => onSelectItem(item.id, item.isDone)}
                ></input>
                <span>{item.text}</span>
                <Button onClick={deleteTaskItemhandler}>X</Button>
              </li>
            );
          })}
        </ul>
        <div className={styles.filterButtons}>
          <Button
            onClick={() => changeFilter("all")}
            classes={filter === "all" ? styles.buttonActive : ""}
          >
            All
          </Button>
          <Button
            onClick={() => changeFilter("active")}
            classes={filter === "active" ? styles.buttonActive : ""}
          >
            Active
          </Button>
          <Button
            onClick={() => changeFilter("completed")}
            classes={filter === "completed" ? styles.buttonActive : ""}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

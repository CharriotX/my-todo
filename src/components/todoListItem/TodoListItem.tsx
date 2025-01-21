import { ChangeEvent, useState } from "react";
import { Button } from "../button/Button";
import { FilterValueType } from "../todoList/TodoList";
import styles from "./TodoListItem.module.css";
import { TodoItem, TodoListType } from "../todoAreas/TodoAreas";
import { TodoStatusType } from "../todoArea/TodoArea";
import TodoListItemInput from "./todoListIteminput/TodoListItemInput";

type Props = {
  title?: string;
  todoList: TodoListType;
  changeStatus: (status: TodoStatusType, todoId: number) => void;
};

export const TodoListItem = ({ todoList, changeStatus }: Props) => {
  const [taskItems, setTaskItems] = useState(todoList.todoItems);
  const [filter, setFilter] = useState<FilterValueType>("all");
  const [taskInputTitle, setTaskInputTitle] = useState<string>("");

  const deleteTaskItem = (itemId: number) => {
    setTaskItems(taskItems.filter((item) => item.id !== itemId));
  };

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  const createTaskHandler = () => {
    setTaskItems([
      ...taskItems,
      { id: 33, text: taskInputTitle, isDone: false },
    ]);
    setTaskInputTitle(" ");
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
        { id: 33, text: taskInputTitle, isDone: false },
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

  let filteredTaskItems: Array<TodoItem> = taskItems;
  if (filter === "active") {
    filteredTaskItems = taskItems.filter((item) => !item.isDone);
  }
  if (filter === "completed") {
    filteredTaskItems = taskItems.filter((item) => item.isDone);
  }

  const onSelectItem = (itemId: number, isDone: boolean) => {
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
                <Button onClickHandler={deleteTaskItemhandler}>X</Button>
              </li>
            );
          })}
        </ul>
        <div className={styles.filterButtons}>
          <Button
            onClickHandler={() => changeFilter("all")}
            classes={filter === "all" ? styles.buttonActive  : ""}
          >
            All
          </Button>
          <Button
            onClickHandler={() => changeFilter("active")}
            classes={filter === "active" ? styles.buttonActive  : ""}
          >
            Active
          </Button>
          <Button
            onClickHandler={() => changeFilter("completed")}
            classes={filter === "completed" ? styles.buttonActive : ""}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

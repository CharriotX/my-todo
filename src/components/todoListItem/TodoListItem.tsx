import { ChangeEvent, useState } from "react";
import { Button } from "../button/Button";
import { FilterValueType } from "../todoList/TodoList";
import styles from "./TodoListItem.module.css";
import { TodoItem, TodoListType } from "../todoAreas/TodoAreas";
import { TodoStatusType } from "../todoArea/TodoArea";
import { Input } from "../input/Input";

type Props = {
  title?: string,
  todoList: TodoListType,
  changeStatus: (status: TodoStatusType, todoId: number) => void
}

export const TodoListItem = ({ todoList, changeStatus }: Props) => {
  const [taskItems, setTaskItems] = useState(todoList.todoItems)
  const [filter, setFilter] = useState<FilterValueType>("all");
  const [taskInputTitle, setTaskInputTitle] = useState<string>("")

  const deleteTaskItem = (itemId: number) => {
    setTaskItems(taskItems.filter((item) => item.id !== itemId));
  };

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  const createTaskHandler = () => {
    setTaskItems([...taskItems, { id: 33, text: taskInputTitle, isDone: false }])
    setTaskInputTitle(" ")
  }

  const onChangeTaskInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInputTitle(e.target.value)
  }

  const createTaskOnEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTaskItems([...taskItems, { id: 33, text: taskInputTitle, isDone: false }])
      setTaskInputTitle(" ")
    }
  }

  let filteredTaskItems: Array<TodoItem> = taskItems;
  if (filter === "active") {
    filteredTaskItems = taskItems.filter((item) => !item.isDone);
  }
  if (filter === "completed") {
    filteredTaskItems = taskItems.filter((item) => item.isDone);
  }

  const onSelectItem = (itemId: number, isDone: boolean) => {
    setTaskItems(taskItems.map((item) => {
      if (item.id === itemId) {
        item.isDone = !isDone
        return item
      } else {
        return item
      }
    }))
  }

  return (
    <div className={styles.todoListItem}>
      <h3 className={styles.itemTitle}>{todoList.title}</h3>
      <div className={styles.inputBlock}>
        <Input type="text" placeholder="new task" value={taskInputTitle} onChange={onChangeTaskInputTitle} onKeyDown={createTaskOnEnterHandler} />
        <Button onClickHandler={createTaskHandler}>
          Add
        </Button>
      </div>
      <div>
        <ul className={styles.itemList}>
          {filteredTaskItems.map(item => {
            const deleteTaskItemhandler = () => {
              deleteTaskItem(item.id)
            }
            return (
              <li key={item.id}>
                <input type="checkbox" checked={item.isDone} onChange={() => onSelectItem(item.id, item.isDone)}></input>
                <span>{item.text}</span>
                <Button onClickHandler={deleteTaskItemhandler}>X</Button>
              </li>
            )
          })}
        </ul>
        <div>
          <Button onClickHandler={() => changeFilter("all")}>All</Button>
          <Button onClickHandler={() => changeFilter("active")}>Active</Button>
          <Button onClickHandler={() => changeFilter("completed")}>Completed</Button>
        </div>
        <div>
          <Button onClickHandler={() => changeStatus(todoList.status, todoList.id)}>
            {todoList.status !== "Completed" ? "Change status" : "Complete task"}
          </Button>
        </div>
      </div>
    </div >
  )
};

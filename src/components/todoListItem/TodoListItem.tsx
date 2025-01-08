import { useState } from "react";
import { Button } from "../button/Button";
import { FilterValueType, TaskItem, TaskType } from "../todoList/TodoList";
import styles from "./TodoListItem.module.css";

type Props = {
  title?: string,
  task: TaskType,
}

export const TodoListItem = ({task}: Props) => {
  const [taskItems, setTaskItems] = useState(task.taskItems)
  const [filter, setFilter] = useState<FilterValueType>("all");

  const deleteTaskItem = ( itemId: number) => {
    setTaskItems(taskItems.filter((item) => item.id !== itemId));
  };

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  let filteredTaskItems: Array<TaskItem> = taskItems;
  if (filter === "active") {
    filteredTaskItems = taskItems.filter((item) => !item.isDone);
  }
  if (filter === "completed") {
    filteredTaskItems = taskItems.filter((item) => item.isDone);
  }

  const onSelectItem = (itemId: number, isDone: boolean) => {
    setTaskItems(taskItems.map((item)=>{
      if(item.id === itemId){
        item.isDone = !isDone
        return item
      } else {
        return item
      }
    }))
  }

  return (
    <div className={styles.todoListItem}>
      <h3 className={styles.itemTitle}>{task.title}</h3>
      <div>
        <input type="text" placeholder="new task" />
        <button>Add</button>
      </div>
      <div>
        <ul className={styles.itemList}>
          {filteredTaskItems.map(item => {
            return (
              <li key={item.id}>
                <input type="checkbox" checked={item.isDone} onChange={() => onSelectItem(item.id, item.isDone)}></input>
                <span>{item.text}</span>
                <Button onClickHandler={() => deleteTaskItem(item.id)}>X</Button>
              </li>
            )
          })}
        </ul>
        <div>
          <Button onClickHandler={() => changeFilter("all")}>All</Button>
          <Button onClickHandler={() => changeFilter("active")}>Active</Button>
          <Button onClickHandler={() => changeFilter("completed")}>Completed</Button>
        </div>
      </div>
    </div>
  )
};

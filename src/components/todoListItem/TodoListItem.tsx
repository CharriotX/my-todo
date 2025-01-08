import { Button } from "../button/Button";
import { FilterValueType, TaskItem } from "../todoList/TodoList";
import styles from "./TodoListItem.module.css";

type Props = {
  title: string,
  taskItems: TaskItem[],
  deleteTaskItem: (taskItemId: number) => void
  changeFilter: (filter:FilterValueType) => void
}

export const TodoListItem = ({ title, taskItems, deleteTaskItem, changeFilter }: Props) => {
  return (
    <div className={styles.todoListItem}>
      <h3 className={styles.itemTitle}>{title}</h3>
      <div>
        <input type="text" placeholder="new task" />
        <button>Add</button>
      </div>
      <div>
        <ul className={styles.itemList}>
          {taskItems.map(item => {
            return (
              <li key={item.id}>
                <input type="checkbox" checked={item.isDone}></input>
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

import { Task } from "../todoList/TodoList";
import styles from "./TodoListItem.module.css";

type Props = {
    title: string,
    tasks: Task[]
}

export const TodoListItem = ({title, tasks}: Props) => {
  return (
    <div className={styles.todoListItem}>
          <h3 className={styles.itemTitle}>{title}</h3>
          <div>
            <input type="text" placeholder="new task" />
            <button>Add</button>
          </div>

          <div>
            <ul className={styles.itemList}>
              <li>
                <input type="checkbox" checked={true}></input>
                <span>{tasks[0].text}</span>
              </li>
              <li>
                <input type="checkbox" checked={true}></input>
                <span>{tasks[1].text}</span>
              </li>
              <li>
                <input type="checkbox" checked={false}></input>
                <span>{tasks[2].text}</span>
              </li>
            </ul>
          </div>
        </div>
  )
};

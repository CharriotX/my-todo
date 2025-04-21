import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import styles from "./Tasks.module.css";
import { useEffect } from "react";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { fetchTasks, selectTasks } from "@/features/todolists/model/tasks-slice";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice";
import TaskItem from "./TaskItem/TaskItem";
import { TaskStatus } from "@/common/enums";

type Props = {
  todolist: DomainTodolist;
};

const Tasks = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  useEffect(() => {
    dispatch(fetchTasks(todolist.id));
  }, []);

  let filteredTaskItems = tasks[todolist.id];
  if (todolist.filter === "active") {
    filteredTaskItems = filteredTaskItems.filter((item) => item.status === TaskStatus.InProgress);
  }
  if (todolist.filter === "completed") {
    filteredTaskItems = filteredTaskItems.filter((item) => item.status === TaskStatus.Completed);
  }

  return (
    <ul className={styles.box}>
      {filteredTaskItems && filteredTaskItems.length === 0 ? (
        <div className={styles.noTasksBlock}>No tasks</div>
      ) : (
        filteredTaskItems &&
        filteredTaskItems.map((item) => {
          return <TaskItem task={item} todolist={todolist} key={item.id} />;
        })
      )}
    </ul>
  );
};

export default Tasks;

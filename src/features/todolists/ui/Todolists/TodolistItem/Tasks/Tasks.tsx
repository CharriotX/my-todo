import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import styles from "./Tasks.module.css";
import { useEffect, useState } from "react";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice";
import TaskItem from "./TaskItem/TaskItem";
import { TaskStatus } from "@/common/enums";
import { useGetTasksQuery } from "@/features/todolists/api/taskApi";
import { setAppError } from "@/app/app-slice";
import { TasksPagination } from "./TasksPagination/TasksPagination";
import { PAGE_SIZE } from "@/common/constants";

type Props = {
  todolist: DomainTodolist;
};

const Tasks = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1)
  const { data: tasks, error } = useGetTasksQuery({ todolistId: todolist.id, params: { page: page } })

  useEffect(() => {
    if (!error) return
    if ('status' in error) {
      const errorMessage = 'error' in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppError({ error: errorMessage }))
    } else {
      dispatch(setAppError({ error: error.message || "Some error occured" }))
    }
  }, [error]);



  let filteredTaskItems = tasks?.items;
  if (todolist.filter === "active") {
    filteredTaskItems = filteredTaskItems?.filter((item) => item.status === TaskStatus.New);
  }
  if (todolist.filter === "completed") {
    filteredTaskItems = filteredTaskItems?.filter((item) => item.status === TaskStatus.Completed);
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
      {tasks && tasks?.totalCount > PAGE_SIZE && <TasksPagination page={page} setPage={setPage} totalCount={tasks?.totalCount || 0}></TasksPagination>}
    </ul>
  );
};

export default Tasks;

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../button/Button";
import styles from "./TodoListItem.module.css";
import { FilterTasksType, TodoStatusType, TodoTask, TodoType } from "../todoAreas/TodoAreas";
import TodoListItemInput from "./todoListIteminput/TodoListItemInput";

type Props = {
  title?: string;
  todoList: TodoType;
  changeStatus: (payload: { status: TodoStatusType, todoId: string }) => void;
  changeTaskFilter: (payload: { todoId: string, filter: FilterTasksType }) => void
  deleteTodo: (todoId: string) => void
  createTask: (payload: { todoId: string, text: string }) => void
  deleteTask: (payload: { todoId: string, taskId: string }) => void
  selectTaskItem: (payload: { todoId: string, taskId: string, checked: boolean }) => void
};

export const TodoListItem = ({ todoList, changeStatus, deleteTodo, changeTaskFilter, createTask, deleteTask, selectTaskItem }: Props) => {
  const [taskInputTitle, setTaskInputTitle] = useState<string>("");

  useEffect(() => {
    onStatusChange()
  }, [todoList.todoTasks])

  const createTaskHandler = () => {
    createTask({ todoId: todoList.id, text: taskInputTitle })
    setTaskInputTitle("");
  };
  const createTaskOnEnterHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      createTask({ todoId: todoList.id, text: taskInputTitle })
      setTaskInputTitle(" ");
    }
  };
  const deleteTaskHandler = (taskId: string) => {
    deleteTask({ todoId: todoList.id, taskId })
  };

  const changeFilterHandler = (filter: FilterTasksType) => {
    changeTaskFilter({ todoId: todoList.id, filter })
  };

  const deleteTodoHandler = () => {
    deleteTodo(todoList.id)
  }

  const onChangeTaskInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInputTitle(e.target.value);
  };

  const onStatusChange = () => {
    if (todoList.todoTasks.length === 0) {
      return
    }
    if (todoList.todoTasks.every((task) => task.isDone === false)) {
      changeStatus({ status: "Todo", todoId: todoList.id });
    }
    if (todoList.todoTasks.some((task) => task.isDone === true)) {
      changeStatus({ status: "In Progress", todoId: todoList.id });
    }
    if (todoList.todoTasks.every((task) => task.isDone === true)) {
      changeStatus({ status: "Completed", todoId: todoList.id });
    }
  };

  let filteredTaskItems: TodoTask[] = todoList.todoTasks;
  if (todoList.filter === "active") {
    filteredTaskItems = todoList.todoTasks.filter((item) => !item.isDone);
  }
  if (todoList.filter === "completed") {
    filteredTaskItems = todoList.todoTasks.filter((item) => item.isDone);
  }

  const onSelectItem = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    selectTaskItem({ todoId: todoList.id, taskId: taskId, checked: e.currentTarget.checked })
  };

  return (
    <div className={todoList.status === "Completed" ? styles.todoListItem + " " + styles.completed : styles.todoListItem}>
      <h3 className={styles.itemTitle}>{todoList.title}</h3>
      <TodoListItemInput
        taskInputTitle={taskInputTitle}
        createTaskHandler={createTaskHandler}
        onChangeTaskInputTitle={onChangeTaskInputTitle}
        createTaskOnEnterHandler={createTaskOnEnterHandler}
        disabled={todoList.status === "Completed" ? true : false}
      />
      <div>
        <ul className={styles.itemList}>
          {filteredTaskItems.length === 0 && <div>No tasks</div>}
          {filteredTaskItems.map((item) => {
            const deleteTaskItemhandler = () => {
              deleteTaskHandler(item.id);
            };
            return (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={(e) => onSelectItem(item.id, e)}
                ></input>
                <span>{item.text}</span>
                <Button onClick={deleteTaskItemhandler} styleType="default" disabled={todoList.status === "Completed" ? true : false}>X</Button>
              </li>
            );
          })}
        </ul>
        <div className={styles.filterButtons}>
          <Button
            onClick={() => changeFilterHandler("all")}
            styleType={todoList.filter === "all" ? "active" : "default"}
            disabled={todoList.status === "Completed" ? true : false}
          >
            All
          </Button>
          <Button
            onClick={() => changeFilterHandler("active")}
            styleType={todoList.filter === "active" ? "active" : "default"}
            disabled={todoList.status === "Completed" ? true : false}
          >
            Active
          </Button>
          <Button
            onClick={() => changeFilterHandler("completed")}
            styleType={todoList.filter === "completed" ? "active" : "default"}
            disabled={todoList.status === "Completed" ? true : false}
          >
            Completed
          </Button>
        </div>
      </div>
      {todoList.status === "Completed" && <Button styleType='disabled' onClick={deleteTodoHandler}>Complete todo</Button>}
    </div >
  );
};

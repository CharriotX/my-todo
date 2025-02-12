import { ChangeEvent, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import styles from "./TodoListItem.module.css";
import { FilterTasksType, TodoStatusType, TodoTask, TodoType } from "../todoAreas/TodoAreas";
import CreateTodoItemForm from "../createTodoItemForm/CreateTodoItemForm";
import { EditableInput } from "../editableInput/EditableInput";
import { Box, ButtonGroup, Checkbox, Collapse } from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { IconButton } from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

type Props = {
  title?: string;
  todoList: TodoType;
  changeStatus: (payload: { status: TodoStatusType, todoId: string }) => void;
  changeTaskFilter: (payload: { todoId: string, filter: FilterTasksType }) => void
  deleteTodo: (todoId: string) => void
  createTask: (payload: { todoId: string, text: string }) => void
  deleteTask: (payload: { todoId: string, taskId: string }) => void
  selectTaskItem: (payload: { todoId: string, taskId: string, checked: boolean }) => void
  updateTodoTitle: (payload: { newTitle: string, todoId: string }) => void
};

export const TodoListItem = ({ todoList, changeStatus, deleteTodo, changeTaskFilter, createTask, deleteTask, selectTaskItem, updateTodoTitle }: Props) => {
  const [isCollapsed, setIsColapsed] = useState<boolean>(false)
  const [removeItemId, setRemoveItemId] = useState<string>("")

  useEffect(() => {
    onStatusChange()
  }, [todoList.todoTasks])

  const createTaskHandler = (inputText: string) => {
    createTask({ todoId: todoList.id, text: inputText })
  };

  const deleteTaskHandler = (taskId: string) => {
    setRemoveItemId(taskId)
    setTimeout(() => {
      deleteTask({ todoId: todoList.id, taskId })
      setRemoveItemId("")
    }, 300)

  };

  const changeFilterHandler = (filter: FilterTasksType) => {
    changeTaskFilter({ todoId: todoList.id, filter })
  };

  const deleteTodoHandler = () => {
    deleteTodo(todoList.id)
  }
  const updateTodoTitleHandler = (newTitle: string) => {
    updateTodoTitle({ newTitle, todoId: todoList.id })
  }

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

  const onSelectItem = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    selectTaskItem({ todoId: todoList.id, taskId: taskId, checked: e.currentTarget.checked })
  };

  const toggleCollapsedTodo = () => {
    setIsColapsed(!isCollapsed)
  }

  let filteredTaskItems: TodoTask[] = todoList.todoTasks;
  if (todoList.filter === "active") {
    filteredTaskItems = todoList.todoTasks.filter((item) => !item.isDone);
  }
  if (todoList.filter === "completed") {
    filteredTaskItems = todoList.todoTasks.filter((item) => item.isDone);
  }

  return (
    <div className={styles.todoListItem}>
      <EditableInput text={todoList.title} updateItem={updateTodoTitleHandler}></EditableInput>
      <div className={styles.collpseButtonBlock}>
        <IconButton onClick={toggleCollapsedTodo}>
          {isCollapsed ? <ExpandMoreOutlinedIcon></ExpandMoreOutlinedIcon> : <ExpandLessOutlinedIcon></ExpandLessOutlinedIcon>}
        </IconButton>
      </div>

      {/* {!isCollapsed && ( */}
      <div>
        <Collapse in={!isCollapsed} orientation='vertical'>
          <CreateTodoItemForm
            addItem={createTaskHandler}
            disabled={todoList.status === "Completed" || todoList.todoTasks.length >= 6 ? true : false}
            placeholder={todoList.todoTasks.length >= 6 ? "Maximum number of tasks" : "New task title..."}
          />
          <div>
            <ul className={styles.itemList}>
              {filteredTaskItems.length === 0 && <div className={styles.noTasks}>No tasks</div>}
              {filteredTaskItems.map((item) => {
                return (
                  <Collapse key={item.id} in={removeItemId !== item.id}>
                    <li>
                      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Checkbox
                          checked={item.isDone}
                          onChange={(e) => onSelectItem(item.id, e)}
                          size={"small"}
                        ></Checkbox>
                        <div>{item.text}</div>
                      </Box>
                      <IconButton onClick={() => deleteTaskHandler(item.id)} disabled={todoList.status === 'Completed'}>
                        <CancelPresentationIcon></CancelPresentationIcon>
                      </IconButton>
                    </li>
                  </Collapse>
                );
              })}
            </ul>
            <div className={styles.filterButtons}>
              {todoList.status === 'Completed'
                ? <Button onClick={deleteTodoHandler} color={'success'} variant='contained'>Complete todo</Button>
                : <ButtonGroup sx={{ fontWeight: 'bold' }}>
                  <Button
                    onClick={() => changeFilterHandler("all")}
                    color={todoList.filter === "all" ? "primary" : "secondary"}
                    sx={{ fontSize: 10, fontWeight: 'bold' }}
                    variant={todoList.filter === "all" ? 'contained' : 'outlined'}
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => changeFilterHandler("active")}
                    color={todoList.filter === "active" ? "primary" : "secondary"}
                    size={'small'}
                    sx={{ fontSize: 10, fontWeight: 'bold' }}
                    variant={todoList.filter === "active" ? 'contained' : 'outlined'}
                  >
                    Active
                  </Button>
                  <Button
                    onClick={() => changeFilterHandler("completed")}
                    color={todoList.filter === "completed" ? 'primary' : 'secondary'}
                    size={'small'}
                    variant={todoList.filter === "completed" ? 'contained' : 'outlined'}
                    sx={{ fontSize: 10, fontWeight: 'bold' }}
                  >
                    Completed
                  </Button>
                </ButtonGroup>
              }
            </div>
          </div>
        </Collapse>
      </div>
      {/* )
      } */}
    </div >
  );
};

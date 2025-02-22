import { v1 } from "uuid";
import { FilterTaskType, TodoStatusType, TodoTaskType, TodoType } from "../../components/todoList/TodoList";

const REMOVE_TODOLIST = "REMOVE_TODOLIST";
const CREATE_TODOLIST = "CREATE_TODOLIST"
const UPDATE_TODOLIST_TITLE = "UPDATE_TODOLIST_TITLE"
const CHANGE_STATUS_TODOLIST = "CHANGE_STATUS_TODOLIST"
const CHANGE_TASK_FILTER_TODOLIST = "CHANGE_TASK_FILTER_TODOLIST"
const CREATE_TASK = "CREATE_TASK";
const REMOVE_TASK = "REMOVE_TASK"
const SELECT_TASK = "SELECT_TASK"

export type DeleteTodoActionType = {
    type: typeof REMOVE_TODOLIST,
    payload: {
        id: string
    }
}
export type CreateTodoActionType = {
    type: typeof CREATE_TODOLIST,
    payload: {
        newTodo: TodoType,
    }
}

export type UpdtaeTodoTitleActionType = {
    type: typeof UPDATE_TODOLIST_TITLE,
    payload: {
        id: string,
        newTitle: string
    }
}

export type ChangeStatusTodoActionType = {
    type: typeof CHANGE_STATUS_TODOLIST,
    payload: {
        todoId: string,
        status: TodoStatusType
    }
}

export type ChangeTaskFilterTodoActionType = {
    type: typeof CHANGE_TASK_FILTER_TODOLIST,
    payload: {
        todoId: string,
        filter: FilterTaskType
    }
}
type CreateTaskType = {
    type: typeof CREATE_TASK,
    payload: {
        todoId: string,
        text: string
    }
}

type RemoveTaskType = {
    type: typeof REMOVE_TASK,
    payload: {
        todoId: string,
        taskId: string
    }
}

type SelectTaskType = {
    type: typeof SELECT_TASK,
    payload: {
        todoId: string,
        taskId: string,
        checked: boolean
    }
}

type ActionType = DeleteTodoActionType
    | CreateTodoActionType
    | UpdtaeTodoTitleActionType
    | ChangeStatusTodoActionType
    | ChangeTaskFilterTodoActionType
    | CreateTaskType
    | RemoveTaskType
    | SelectTaskType

export const todoListReducer = (state: TodoType[], action: ActionType): TodoType[] => {

    switch (action.type) {
        case CREATE_TODOLIST:
            return [...state, action.payload.newTodo]
            break;
        case REMOVE_TODOLIST:

            return state.filter(item => item.id !== action.payload.id)
            break;
        case UPDATE_TODOLIST_TITLE:

            return state.map(item => item.id === action.payload.id ? { ...item, title: action.payload.newTitle } : item)
            break;
        case CHANGE_STATUS_TODOLIST:
            const { todoId, status } = action.payload
            return state.map(item => item.id === todoId ? { ...item, status } : item)
            break;
        case CHANGE_TASK_FILTER_TODOLIST:
            return state.map(item => item.id === action.payload.todoId ? { ...item, filter: action.payload.filter } : item)
            break;
        case CREATE_TASK:
            const newTask: TodoTaskType = { id: v1(), text: action.payload.text, isDone: false }
            return state.map(item => item.id === action.payload.todoId ? { ...item, todoTasks: [...item.todoTasks, newTask] } : item)
            break;
        case REMOVE_TASK:
            return state.map(item => item.id === action.payload.todoId
                ? { ...item, todoTasks: item.todoTasks.filter(x => x.id !== action.payload.taskId) }
                : item)
            break;
        case SELECT_TASK:
            return state.map(item => item.id === action.payload.todoId
                ? { ...item, todoTasks: item.todoTasks.map(x => x.id === action.payload.taskId ? { ...x, isDone: action.payload.checked } : x) }
                : item)
            break;

        default:
            return state;
    }
}

export const removeTodoListAC = (id: string): DeleteTodoActionType => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            id: id
        }
    } as const
}
export const createTodoListAC = (newTodo: TodoType): CreateTodoActionType => {
    return {
        type: CREATE_TODOLIST,
        payload: {
            newTodo
        }
    } as const
}

export const updateTodolistTitleAC = (payload: { id: string, newTitle: string }): UpdtaeTodoTitleActionType => {
    const { id, newTitle } = payload
    return {
        type: UPDATE_TODOLIST_TITLE,
        payload: {
            id: id,
            newTitle: newTitle
        }
    } as const
}

export const changeStatusTodolistAC = (payload: { status: TodoStatusType, todoId: string }): ChangeStatusTodoActionType => {
    const { status, todoId } = payload

    return {
        type: CHANGE_STATUS_TODOLIST,
        payload: {
            todoId,
            status: status
        }
    }
}

export const changeTasksFilterTodolistAC = (payload: { filter: FilterTaskType, todoId: string }): ChangeTaskFilterTodoActionType => {
    const { filter, todoId } = payload

    return {
        type: CHANGE_TASK_FILTER_TODOLIST,
        payload: {
            todoId,
            filter: filter
        }
    }
}
export const createTaskAC = (payload: { todoId: string, text: string }): CreateTaskType => {
    const { todoId, text } = payload
    return {
        type: CREATE_TASK,
        payload: {
            todoId,
            text
        }
    } as const
}
export const removeTaskAC = (payload: { todoId: string, taskId: string }): RemoveTaskType => {
    const { todoId, taskId } = payload
    return {
        type: REMOVE_TASK,
        payload: {
            todoId,
            taskId
        }
    } as const
}

export const selectTaskAC = (payload: { todoId: string, taskId: string, checked: boolean }): SelectTaskType => {
    const { todoId, taskId, checked } = payload
    return {
        type: SELECT_TASK,
        payload: {
            todoId,
            taskId,
            checked
        }
    } as const
}

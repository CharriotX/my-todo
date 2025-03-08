import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { FilterTaskType, TodoStatusType, TodoTaskType, TodolistType } from "../ui/Todolists/Todolists";

const initialState: TodolistType[] = []

export const createTodolistAC = createAction<{ newTodo: TodolistType }>("todolists/createTodolist")
export const deleteTodolistAC = createAction<{ todoId: string }>("todolists/deleteTodolist")
export const updateTodolistTitleAC = createAction<{ todoId: string, newTitle: string }>("todolists/updateTodolistTitle")
export const changeStatusTodolistAC = createAction<{ todoId: string, status: TodoStatusType }>("todolists/changeStatusTodolist")
export const changeTasksFilterAC = createAction<{ todoId: string, filter: FilterTaskType }>("todolists/changeTasksFilter")

export const createTaskAC = createAction<{ todoId: string, taskTitle: string }>("todolists/createTask")
export const deleteTaskAC = createAction<{ todoId: string, taskId: string }>("todolists/deleteTask")
export const selectTaskAC = createAction<{ todoId: string, taskId: string, checked: boolean }>("todolists/selectTask")
export const updateTaskTitleAC = createAction<{ todoId: string, taskId: string, newTitle: string }>("todolists/updateTaskTitle")

export const todolistsReducer = createReducer(initialState, builder =>
    builder.addCase(createTodolistAC, (state, action) => {
        const { newTodo } = action.payload
        state.push(newTodo)
    }).addCase(deleteTodolistAC, (state, action) => {
        const { todoId } = action.payload
        const todoIndex = state.findIndex(todo => todo.id === todoId)
        if (todoIndex !== -1) {
            state.splice(todoIndex, 1)
        }
    }).addCase(updateTodolistTitleAC, (state, action) => {
        const todolist = state.find(todo => todo.id === action.payload.todoId)
        if (todolist) {
            todolist.title = action.payload.newTitle
        }
    }).addCase(changeStatusTodolistAC, (state, action) => {
        const todolist = state.find(todo => todo.id === action.payload.todoId)
        if (todolist) {
            todolist.status = action.payload.status
        }
    }).addCase(changeTasksFilterAC, (state, action) => {
        const todolist = state.find(todo => todo.id === action.payload.todoId)
        if (todolist) {
            todolist.filter = action.payload.filter
        }
    }).addCase(createTaskAC, (state, action) => {
        const todolist = state.find(todo => todo.id === action.payload.todoId)
        const newTask: TodoTaskType = { id: nanoid(), text: action.payload.taskTitle, isDone: false }
        if (todolist) {
            todolist.todoTasks.unshift(newTask)
        }
    }).addCase(deleteTaskAC, (state, action) => {
        const { todoId, taskId } = action.payload
        const todolist = state.find(todo => todo.id === todoId)
        if (todolist) {
            const taskIndex = todolist.todoTasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                todolist.todoTasks.splice(taskIndex, 1)
            }
        }
    }).addCase(selectTaskAC, (state, action) => {
        const { todoId, taskId, checked } = action.payload
        const todolist = state.find(todo => todo.id === todoId)
        if (todolist) {
            const task = todolist.todoTasks.find(x => x.id === taskId)
            if (task) {
                task.isDone = checked
            }
        }
    }).addCase(updateTaskTitleAC, (state, action) => {
        const { todoId, taskId, newTitle } = action.payload
        const todolist = state.find(todo => todo.id === todoId)
        if (todolist) {
            const task = todolist.todoTasks.find(x => x.id === taskId)
            if (task) {
                task.text = newTitle
            }
        }
    })
)

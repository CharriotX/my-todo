import { updateTodolistTitleAC } from "./todolists-reduser";
import { beforeEach, expect, test } from 'vitest'
import { TodolistType } from "../../features/todolists/ui/Todolists/Todolists";
import { nanoid } from "@reduxjs/toolkit";

let todoListId_1: string
let todoListId_2: string
let initialState: TodolistType[]

beforeEach(() => {
    todoListId_1 = nanoid()
    todoListId_2 = nanoid()

    initialState = ([
        {
            id: todoListId_1,
            title: "Games",
            status: "Todo",
            filter: "all",
            todoTasks: [
                { id: nanoid(), text: "Dota", isDone: false },
                { id: nanoid(), text: "The Witcher", isDone: false },
                { id: nanoid(), text: "WoW", isDone: false }
            ]
        },
        {
            id: todoListId_2,
            title: "Films",
            status: "Todo",
            filter: "all",
            todoTasks: [
                { id: nanoid(), text: "Seven", isDone: false },
                { id: nanoid(), text: "Iron man", isDone: false },
                { id: nanoid(), text: "Tenet", isDone: false }
            ]
        },
    ]);
})

test('delete todolist reducer', () => {

    const action = removeTodoListAC(todoListId_1)
    const endState = todoListReducer(initialState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
})

test('create todolist reducer', () => {
    const newTodo: TodolistType = {
        id: v1(),
        title: "!1111111",
        filter: "all",
        status: "Todo",
        todoTasks: []
    }

    const action = createTodoListAC(newTodo)
    const endState = todoListReducer(initialState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("!1111111")
})

test('update todolist title reducer', () => {

    const action = updateTodolistTitleAC({ id: todoListId_2, newTitle: "Books" })
    const endState = todoListReducer(initialState, action)

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("Books")
})
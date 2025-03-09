import { beforeEach, expect, test } from 'vitest'
import { nanoid } from "@reduxjs/toolkit";

let todoListId_1: string
let todoListId_2: string

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

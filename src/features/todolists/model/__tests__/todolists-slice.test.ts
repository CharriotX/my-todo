import { nanoid } from "@reduxjs/toolkit";
import { deleteTodolist, DomainTodolist, todolistSlice } from "../todolists-slice";
import { beforeEach, expect, test } from "vitest"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1 },
    ]
})

test("corect delete todolist", () => {
    const endState = todolistSlice.reducer(startState,
        deleteTodolist.fulfilled({ todolistId: todolistId1 }, "requestId", todolistId1)
    )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
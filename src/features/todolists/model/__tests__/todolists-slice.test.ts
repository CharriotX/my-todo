import { nanoid } from "@reduxjs/toolkit";
import { changeTodolistFilter, createTodolist, deleteTodolist, DomainTodolist, todolistSlice, updateTodolistTitle } from "../todolists-slice";
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

test("correct delete todolist", () => {
    const endState = todolistSlice.reducer(startState,
        deleteTodolist.fulfilled({ todolistId: todolistId1 }, "requestId", todolistId1)
    )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct create todolist", () => {
    const title = "todolist3"
    const todolist = {
        id: "todolist3",
        title,
        addedDate: "",
        order: 1
    }
    const action = createTodolist.fulfilled({ todolist }, "requestId", title)
    const endState = todolistSlice.reducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe("todolist3")
})

test("correct change todolist title", () => {
    const title = "todolist33"
    const action = updateTodolistTitle.fulfilled({ todolistId: todolistId1, title }, "requestId", { todolistId: todolistId1, title })
    const endState = todolistSlice.reducer(startState, action)

    expect(endState[0].title).toBe(title)
})

test("correct change todolist filter", () => {
    const action = changeTodolistFilter({ todolistId: todolistId1, filter: "completed" })
    const endState = todolistSlice.reducer(startState, action)

    expect(endState[0].filter).toBe("completed")
})
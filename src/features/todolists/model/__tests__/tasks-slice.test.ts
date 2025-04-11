import { TaskPriority, TaskStatus } from "@/common/enums"
import { beforeEach, expect, test } from "vitest"
import { createTask, deleteTask, tasksSlice, updateTask } from "../tasks-slice"
import { nanoid } from "@reduxjs/toolkit"
import { createTodolist, deleteTodolist, todolistSlice } from "../todolists-slice"
import exp from "constants"

let startState = {}
let todolistId1: string
let todolistId2: string
let todolistId3: string

const taskDefaultValues = {
    description: '',
    deadline: '',
    addedDate: '',
    startDate: '',
    priority: TaskPriority.Low,
    order: 0,
    filter: "all"
}

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()
    todolistId3 = nanoid()

    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatus.Completed,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatus.New,
                todoListId: 'todolistId1',
                ...taskDefaultValues,
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatus.Completed,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatus.New,
                todoListId: 'todolistId2',
                ...taskDefaultValues,
            },
        ],
    }
})

test("task should be created at correct array", () => {
    const task = {
        id: nanoid(),
        title: "juice",
        status: TaskStatus.New,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId2",
    }

    const endState = tasksSlice.reducer(startState, createTask.fulfilled({ task }, "requestId", { todolistId: "todolistId2", title: "juice" }))

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe("juice")
    expect(endState.todolistId2[1].status).toBe(TaskStatus.New)
})

test("should be correct delete task", () => {

    const endState = tasksSlice.reducer(
        startState,
        deleteTask.fulfilled({ todolistId: "todolistId2", taskId: "2", }, "requestId", {
            todolistId: "todolistId2",
            taskId: "2"
        }))

    expect(endState).toEqual({
        todolistId1: [
            {
                id: "1",
                title: "CSS",
                status: TaskStatus.New,
                description: "",
                deadline: "",
                filter: "all",
                addedDate: "",
                startDate: "",
                priority: TaskPriority.Low,
                order: 0,
                todoListId: "todolistId1",
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatus.Completed,
                description: "",
                filter: "all",
                deadline: "",
                addedDate: "",
                startDate: "",
                priority: TaskPriority.Low,
                order: 0,
                todoListId: "todolistId1",
            },
            {
                id: "3",
                title: "React",
                status: TaskStatus.New,
                description: "",
                filter: "all",
                deadline: "",
                addedDate: "",
                startDate: "",
                priority: TaskPriority.Low,
                order: 0,
                todoListId: "todolistId1",
            },
        ],
        todolistId2: [
            {
                id: "1",
                title: "bread",
                status: TaskStatus.New,
                description: "",
                filter: "all",
                deadline: "",
                addedDate: "",
                startDate: "",
                priority: TaskPriority.Low,
                order: 0,
                todoListId: "todolistId2",
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatus.New,
                description: "",
                filter: "all",
                deadline: "",
                addedDate: "",
                startDate: "",
                priority: TaskPriority.Low,
                order: 0,
                todoListId: "todolistId2",
            },
        ],
    })
})

test("change task status should be correct", () => {
    const task = {
        id: "1",
        title: "milk1",
        status: TaskStatus.Completed,
        description: "",
        deadline: "",
        addedDate: "",
        startDate: "",
        priority: TaskPriority.Low,
        order: 0,
        todoListId: "todolistId1",
    }

    const endState = tasksSlice.reducer(
        startState,
        updateTask.fulfilled({ task }, "requestId", { todolistId: "todolistId1", taskId: "1", task }
        ))

    expect(endState.todolistId1[0].status).toBe(TaskStatus.Completed)
    expect(endState.todolistId1[0].title).toBe("milk1")
})

test("correct delete tasks array when delete todolist", () => {
    const action = deleteTodolist.fulfilled({ todolistId: "todolistId2" }, "requestId", "todolistId2")

    const endState = tasksSlice.reducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolist2"]).not.toBeDefined()
})

test("correct create tasks array when create todolist", () => {
    const title = "turtlele"
    const todolist = {
        id: "todolistId3",
        title,
        addedDate: "",
        order: 3
    }

    const action = createTodolist.fulfilled({ todolist }, "requestId", title)
    const endState = tasksSlice.reducer(startState, action)

    const keys = Object.keys(endState)

    const newKey = keys.find(key => key !== "todolistId1" && key !== "todolistId2")
    if (!newKey) {
        throw new Error("New key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


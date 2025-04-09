import { TaskPriority, TaskStatus } from "@/common/enums"
import { beforeEach, expect, test } from "vitest"
import { deleteTask, tasksSlice } from "../tasks-slice"
import { nanoid } from "@reduxjs/toolkit"

let startState = {}
let todolistId1: string
let todolistId2: string

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

test("Delete task correctly", () => {
    const endState =
        tasksSlice.reducer(startState, deleteTask.fulfilled({ todolistId: todolistId1, taskId: "1", }, "requesId", { todolistId: todolistId1, taskId: "1" }))

    //expect(endState[todolistId1].length).toBe(2)
    // expect(endState[todolistId1][1].id).toBe("3")
})


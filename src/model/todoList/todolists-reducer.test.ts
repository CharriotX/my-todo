import { v1 } from "uuid";
import { createTodoListAC, removeTodoListAC, todoListReducer, updateTodolistTitleAC } from "./todolists-reduser";
import { beforeEach, expect, test } from 'vitest'
import { TodoType } from "../../components/todoList/TodoList";

let todoListId_1: string
let todoListId_2: string
let initialState: TodoType[]

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()

    initialState = ([
        {
            id: todoListId_1,
            title: "Games",
            status: "Todo",
            filter: "all",
            todoTasks: [
                { id: v1(), text: "Dota", isDone: false },
                { id: v1(), text: "The Witcher", isDone: false },
                { id: v1(), text: "WoW", isDone: false }
            ]
        },
        {
            id: todoListId_2,
            title: "Films",
            status: "Todo",
            filter: "all",
            todoTasks: [
                { id: v1(), text: "Seven", isDone: false },
                { id: v1(), text: "Iron man", isDone: false },
                { id: v1(), text: "Tenet", isDone: false }
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
    const newTodo: TodoType = {
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
import expensesReducer from "../../reducers/expenses"
import expenses from "../fixtures/expenses"


test("should set up default state", () => {
    const defaultState = []
        
    const action = { type: "@@INIT" }  // @@INIT is the default action dispatched by redux  
    const state = expensesReducer(undefined, action)  

    expect(state).toEqual(defaultState)
})

test("should remove expenses by id", () => {
    const action = {
        "type": "REMOVE_EXPENSE",
        id: expenses[1].id
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([expenses[0], expenses[2]])
})

test("should not remove expenses if id not found", () => {
    const action = {
        "type": "REMOVE_EXPENSE",
        id: "-1"
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual(expenses)
})

test("should add an expense ", () => {
    const expense = {
        id: "109",
        description: "a carton of chicken",
        note: "",
        amount: 29500 ,
        createdAt: 20000     
    }

    const action = {
        "type": "ADD_EXPENSE",
        expense
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([...expenses, expense])
})

test("should edit an expense ", () => {
    const updates = {
        amount: 1500
    }

    const action = {
        "type": "EDIT_EXPENSE",
        id: expenses[1].id,
        updates
    }

    const state = expensesReducer(expenses, action)

    expect(state[1].amount).toBe(updates.amount)
})

test("should not edit an expense if id is not found", () => {
    const updates = {
        amount: 1500
    }

    const action = {
        "type": "EDIT_EXPENSE",
        id: "-1",
        updates
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual(expenses)
})

test("should set expenses", () => {
    const action = {
        "type": "SET_EXPENSES",
        expenses: [expenses[1]]
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([expenses[1]])
})


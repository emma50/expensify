import { addExpense, editExpense, removeExpense } from "../../actions/expenses"

describe("should setup actions object: addExpense, editExpense, removeExpense", () => {
    test("should setup remove expense action object", () => {
        const action = removeExpense({id: "123abc"})

        expect(action).toEqual({
            type: "REMOVE_EXPENSE",
            id: "123abc"
        })
    })

    test("should setup edit expense action object", () => {
        const action = editExpense("123abc", { note: "New note value" })

        expect(action).toEqual({
            type: "EDIT_EXPENSE",
            id: "123abc",
            updates: {
                note: "New note value"
            }
        })
    })

    test("should setup add expense action object with provided values", () => {
        const expenseData = {
            description: "Rent",
            amount: 1234,
            createdAt: 1000,
            note: "New note value"
        }

        const action = addExpense(expenseData)

        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        })
    })

    test("should setup add expense action object with default values", () => {
        const expenseData = {
            description: "",
            amount: 0,
            createdAt: 0,
            note: ""
        }

        const action = addExpense(expenseData)

        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        })
    })
})



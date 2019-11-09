import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense 
} from "../../actions/expenses"
import expenses from "../fixtures/expenses"
import database from "../../firebase/firebase"

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

beforeEach((done) => {
    // set some data in the database to be tested
    const expenseData = {}
    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        expenseData[id] = {
            description,
            amount,
            note,
            createdAt
        }
    })

    database.ref("expenses").set(expenseData).then(() => done())  
})

describe("should setup actions object: addExpense, editExpense, removeExpense", () => {
    test("should setup remove expense action object", () => {
        const action = removeExpense({id: "123abc"})

        expect(action).toEqual({
            type: "REMOVE_EXPENSE",
            id: "123abc"
        })
    })

    test("should remove expense from firebase", (done) => {
        const store = mockStore({}) 
        const id = expenses[1].id
        store.dispatch(startRemoveExpense({ id })).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: "REMOVE_EXPENSE",
                id
            })
            return database.ref(`expenses/${id}`).once("value")
        }).then((dataSnapshot) => {
            const emptyData = dataSnapshot.val()
            expect(emptyData).toBeFalsy()
            done()
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

    test("should edit expense in firebase database", (done) => {
        const store = mockStore({}) 
        const id = expenses[0].id
        const updates = { amount: 234561 }

        store.dispatch(startEditExpense(id, updates)).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: "EDIT_EXPENSE",
                id,
                updates
            })

            // Check if value is the same in firebase database
            return database.ref(`expenses/${id}`).once("value")
        }).then((dataSnapshot) => {
            const data = dataSnapshot.val()
            expect(data.amount).toEqual(updates.amount)
            done()
        })
    })

    test("should setup add expense action object with provided values", () => {
        const action = addExpense(expenses[2])

        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: expenses[2]
        })
    })

    test("should add expense to database and store", (done) => {
        const store = mockStore({}) 
        const expenseData = {
            description: "Mobile phone",
            amount: 1000,
            note: "This is better",
            createdAt: 50000
        }

        store.dispatch(startAddExpense(expenseData)).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })

            // Check if value is the same in firebase database
            return database.ref(`expenses/${actions[0].expense.id}`).once("value")
        }).then((dataSnapshot) => {
            const data = dataSnapshot.val()
            expect(data).toEqual(expenseData)
            done()
        })
    })

    test("should add expense with default to database and store", (done) => {
        const store = mockStore({}) 
        const expenseDefaultData = {
            description: "",
            amount: 0,
            note: "",
            createdAt: 0
        }

        store.dispatch(startAddExpense(expenseDefaultData)).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseDefaultData
                }
            })

            // Check if value is the same in firebase database
            return database.ref(`expenses/${actions[0].expense.id}`).once("value")
        }).then((dataSnapshot) => {
            const data = dataSnapshot.val()
            expect(data).toEqual(expenseDefaultData)
            done()
        })
    })

    test("should set up setExpense action object with data", () => {
        const action = setExpenses(expenses)
        expect(action).toEqual({
            type: "SET_EXPENSES",
            expenses
        })
    })

    test("should fetch expenses from firebase", (done) => {
        const store = mockStore({}) 
        store.dispatch(startSetExpenses()).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: "SET_EXPENSES",
                expenses
            })
            done()
        })
    })
})



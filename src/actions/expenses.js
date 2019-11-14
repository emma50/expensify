import database from "../firebase/firebase"

// ACTION GENERATORS
// Add Expense
const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
})

// startAddExpense dispatches addExpense
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const { description, note, amount, createdAt } = expenseData
        const expense = { description, note, amount, createdAt }
        // push expense to firebase database
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            // Dispatch addExpense to the redux store --- gets internally called by redux
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

// Remove Expense
const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id
})

// startRemoveExpense dispatches removeExpense
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        // remove expense from firebase database
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            // Dispatch removeExpenses to the redux store --- get internally called by redux
            dispatch(removeExpense({ id }))
        })
    }
}

// Edit Expense 
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})

// startEditExpense dispatches editExpense
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        // push updates to firebase database
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            // Dispatch editExpense to the redux store --- gets internally called by redux
            dispatch(editExpense(id, updates))
        })
    }
}

// Set Expenses --- get all Expenses
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
})

// startSetExpense dispatches setExpense --- get expenses
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        // get expenses from firebase database
        return database.ref(`users/${uid}/expenses`).once("value").then((dataSnapshot) => {
            const expenses = []
            
            dataSnapshot.forEach((childDataSnapshot) => {
                expenses.push({
                    id: childDataSnapshot.key,
                    ...childDataSnapshot.val()
                })
            })
            // Dispatch setExpenses to the redux store --- get internally called by redux
            dispatch(setExpenses(expenses))
        })
    }
}

export { addExpense, removeExpense, editExpense }
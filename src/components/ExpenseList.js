import React from "react"
import { connect } from "react-redux"
import ExpenseListItem from "./ExpenseListItem"
import selectExpenses from "../selectors/expenses"

export const ExpenseList = (props) => (   // imported only for test cases --- the unconnected version
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense} />
                ))
            )
        }
    </div>
)

// maps store state to Component props
const mapStateToProps = (state) => ({
    // Information from the store the Component want to access
    expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList)

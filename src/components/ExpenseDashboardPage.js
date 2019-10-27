import React from "react"
import ExpenseList from "./ExpenseList"
import ExpenseLisFilters from "./ExpenseListFilters"
import ExpensesSummary from "./ExpensesSummary"

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary/>
        <ExpenseLisFilters/>
        <ExpenseList/>
    </div>        
)

export default ExpenseDashboardPage
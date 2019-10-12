import React from "react"
import ExpenseList from "./ExpenseList"
import ExpenseLisFilters from "./ExpenseListFilters"

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseLisFilters/>
        <ExpenseList/>
    </div>        
)

export default ExpenseDashboardPage
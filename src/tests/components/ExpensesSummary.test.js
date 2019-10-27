import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import { ExpensesSummary } from "../../components/ExpensesSummary"

test("should correctly render ExpenseSummary with 1 expense", () => {
    const wrapper = shallow(
        <ExpensesSummary
            expenseCount={1}
            expenseTotal={235}
        />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should correctly render ExpenseSummary with multiple expenses", () => {
    const wrapper = shallow(
        <ExpensesSummary
            expenseCount={23}
            expenseTotal={167249038515}
        />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
})

import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import expenses from "../fixtures/expenses"
import { EditExpensePage } from "../../components/EditExpensePage"

let startEditExpenseSpy, startRemoveExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    startEditExpenseSpy = jest.fn()
    startRemoveExpenseSpy = jest.fn()
    historySpy = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpenseSpy} 
            startRemoveExpense={startRemoveExpenseSpy} 
            history={historySpy}
            expense={expenses[0]}
        />
    )
})

test("should render EditExpensePage correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should handle editExpense", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0])
    expect(historySpy.push).toHaveBeenLastCalledWith("/")
    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])
})

test("should handle startRemoveExpense", () => {
    wrapper.find("button").simulate("click")
    expect(historySpy.push).toHaveBeenLastCalledWith("/")
    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith({ id: expenses[0].id})
})


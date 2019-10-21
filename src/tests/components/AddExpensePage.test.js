import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import { AddExpensePage } from "../../components/AddExpensePage"
import expenses from "../fixtures/expenses"

let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn()
    historySpy = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={historySpy}/>)
})

test("should render AddExpensePage correctly", () => {
    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should render onSubmit", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0])

    expect(historySpy.push).toHaveBeenLastCalledWith("/")
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[0])
})
import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import expenses from "../fixtures/expenses"
import { EditExpensePage } from "../../components/EditExpensePage"

let editExpenseSpy, removeExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    editExpenseSpy = jest.fn()
    removeExpenseSpy = jest.fn()
    historySpy = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpenseSpy} 
            removeExpense={removeExpenseSpy} 
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
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])
})

test("should handle removeExpense", () => {
    wrapper.find("button").simulate("click")
    expect(historySpy.push).toHaveBeenLastCalledWith("/")
    expect(removeExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id)
})


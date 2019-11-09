import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import expenses from "../fixtures/expenses"
import { EditExpensePage } from "../../components/EditExpensePage"

let editExpenseSpy, startRemoveExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    editExpenseSpy = jest.fn()
    startRemoveExpenseSpy = jest.fn()
    historySpy = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpenseSpy} 
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
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0])
})

test("should handle startRemoveExpense", () => {
    wrapper.find("button").simulate("click")
    expect(historySpy.push).toHaveBeenLastCalledWith("/")
    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id)
})


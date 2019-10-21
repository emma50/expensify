import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import moment from "moment"
import ExpenseForm from "../../components/ExpenseForm"
import expenses from "../fixtures/expenses"

test("should render ExpenseForm correctly", () => {
    const wrapper = shallow(<ExpenseForm/>)

    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should render ExpenseForm with expense data", () => {
    const wrapper = shallow(<ExpenseForm {...expenses[1]}/>)

    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm/>)

    expect(toJson(wrapper)).toMatchSnapshot()
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    })

    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper.state('error')).toBe("Please provide description and amount")
    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should set description on input change", () => {
    const value = "New description"
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    })

    expect(wrapper.state("description")).toBe(value)
})

test("should set note on textarea change", () => {
    const value = "New note value"
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find("textarea").at(0).simulate("change", {
        target: { value }
    })

    expect(wrapper.state("note")).toBe(value)
})

test("should set amount if valid input exist", () => {
    const value = "12.55"
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    })

    expect(wrapper.state("amount")).toBe(value)
})

test("should set not set amount if invalid input exist", () => {
    const value = "12.555"
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    })

    expect(wrapper.state("amount")).toBe("")
})

test("should call onSubmit prop for valid form submission", () => {
    // spies create fake functions
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    })

    expect(wrapper.state("error")).toBe("")
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
})

test("should set new date on date change", () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now)

    expect(wrapper.state("createdAt")).toEqual(now)
})

test("should set calenderFocus on change", () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({ focused })

    expect(wrapper.state("calenderFocused")).toBe(focused)
})


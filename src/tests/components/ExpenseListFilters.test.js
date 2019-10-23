import React from "react"
import { shallow } from "enzyme"
import toJson from 'enzyme-to-json'
import moment from "moment"
import { ExpenseListFilters } from "../../components/ExpenseListFilters"
import { filters, altFilters} from "../fixtures/filters"

let setTextFiltersSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
    setTextFiltersSpy = jest.fn()
    sortByDateSpy = jest.fn(),
    sortByAmountSpy = jest.fn(),
    setStartDateSpy = jest.fn(),
    setEndDateSpy = jest.fn(), 
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFiltersSpy}
            sortByDate={sortByDateSpy}
            sortByAmount={sortByAmountSpy}
            setStartDate={setStartDateSpy}
            setEndDate={setEndDateSpy}
        />
    )
})

test("should render ExpenseListFilters correctly", () => {   // render with default data (filters)
    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should render ExpenseListFilters with alt data correctly", () => {   // render with alternative data (filters)
    wrapper.setProps({
        filters: altFilters
    })

    expect(toJson(wrapper)).toMatchSnapshot()
})

test("should handle text change", () => {
    const value = ""
    wrapper.find("input").simulate("change", {
        target: { value }
    })

    expect(setTextFiltersSpy).toHaveBeenLastCalledWith(value)
})

test("should sort by date", () => {
    const value = "date"
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find("select").simulate("change", {
        target: { value }
    })

    expect(sortByDateSpy).toHaveBeenCalled()
})

test("should sort by amount", () => {
    const value = "amount"
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find("select").simulate("change", {
        target: { value }
    })

    expect(sortByAmountSpy).toHaveBeenCalled()
})

test("should handle date changes", () => {
    const startDate = moment(0).add(4, "years")
    const endDate = moment(0).add(8, "years")
    wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({ startDate, endDate })

    expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate)
    expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate)
})

test("to handle date focus changes", () => {
    const calenderFocused = "endDate"
    wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(calenderFocused)

    expect(wrapper.state("calenderFocused")).toBe(calenderFocused)
})


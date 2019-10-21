import moment from "moment"
import filtersReducer from "../../reducers/filters"


test("should set up default filter values", () => {
    const defaultValue = {
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    }
    const action = { type: "@@INIT" }  // @@INIT is the default action dispatched by redux  
    const state = filtersReducer(undefined, action)  

    expect(state).toEqual(defaultValue)
})

test("should set sortBy to amount", () => {
    const action = { type: "SORT_BY_AMOUNT" }
    const state = filtersReducer(undefined, action)  

    expect(state.sortBy).toBe("amount")
})

test("should set sortBy to date", () => {
    // we only need and care about the sort by props
    const currentValue = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    }
    const action = { type: "SORT_BY_DATE" }
    const state = filtersReducer(currentValue, action)  

    expect(state.sortBy).toBe("date")
})

test("should set text filters", () => {
    const text = "This is my filter"
    const action = {
        type: "SET_TEXT_FILTER",
        text
    }
    const state = filtersReducer(undefined, action)

    expect(state.text).toBe(text)
})

test("should set start date filters", () => {
    const startDate = moment()
    const action = {
        type: "SET_START_DATE",
        startDate
    }
    const state = filtersReducer(undefined, action)

    expect(state.startDate).toEqual(startDate)
})

test("should set end date filters", () => {
    const endDate = moment()
    const action = {
        type: "SET_END_DATE",
        endDate
    }
    const state = filtersReducer(undefined, action)

    expect(state.endDate).toEqual(endDate)
})

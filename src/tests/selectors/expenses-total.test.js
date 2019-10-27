import selectTotalExpense from "../../selectors/expenses-total"
import expenses from "../fixtures/expenses"

test("should return 0 if no expenses", () => {
    const res = selectTotalExpense([])
    expect(res).toBe(0)
})

test("should correctly add up a single expense", () => {
    const singleExpense = expenses[0]
    const res = selectTotalExpense([singleExpense])
    expect(res).toBe(195)
})

test("should correctly add up a multiple expense", () => {
    const res = selectTotalExpense(expenses)
    expect(res).toBe(113790)
})
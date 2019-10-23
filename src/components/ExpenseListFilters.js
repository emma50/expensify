import React from "react"
import { connect } from "react-redux"
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters"
// import uuid from "uuid"


export class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }))
    }

    onTextChange = (e) => (
        this.props.setTextFilter(e.target.value)
    )

    onSortChange = (e) => {
        if (e.target.value === "date") {
            this.props.sortByDate()
        } else if (e.target.value === "amount") {
            this.props.sortByAmount()
        }
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={this.onTextChange}
                 />
                <select 
                    value={this.props.filters.text}
                    onChange={this.onSortChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} 
                    startDateId={"1"}
                    endDate={this.props.filters.endDate} 
                    endDateId={"1"}
                    onDatesChange={this.onDatesChange} 
                    focusedInput={this.state.calenderFocused} 
                    onFocusChange={this.onFocusChange} 
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
} 

// Reading from the store
const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text)  => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () =>  dispatch(sortByAmount())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)
import moment from "moment"

// default filters value
const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const altFilters = {
    text: "bills",
    sortBy: "amount",
    startDate: moment(0),
    endDate: moment(0).add(0, "days")
}

export { filters, altFilters }
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import AppRouter from "./routers/AppRouter"
import configureStore from "./store/configureStore"
import { startSetExpenses } from "./actions/expenses"
import { setTextFilter } from "./actions/filters"
import getVisibleExpenses from "./selectors/expenses"
import "normalize.css/normalize.css"
import './styles/styles.scss'
import 'react-dates/initialize'
import "react-dates/lib/css/_datepicker.css"
import "./firebase/firebase"

// Access store and it's props
const store = configureStore()

// Using the react-redux Provider Component All Components now have access to the store
const jsx = (
    <Provider store={store}>   
        <AppRouter/>
    </Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"))

store.dispatch(startSetExpenses()).then(() => {
    return ReactDOM.render(jsx, document.getElementById("app"))
})


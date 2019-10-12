import React from "react"
import { NavLink } from "react-router-dom"

const HeaderPage = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard </NavLink>
        <NavLink to="/add" activeClassName="is-active">Create expense </NavLink>
        <NavLink to="/help" activeClassName="is-active">help </NavLink>
    </header>
)

export default HeaderPage
import React from "react"
import { Link } from "react-router-dom"

import Navitem from "components/navbar/Navitem"

function Navbar(props) {
    return (
        <nav id="navbar-main" className="navbar navbar-expand-lg navbar-transparent py-0">
            <div className="container mt-md-3">
                <Link className="navbar-brand mr-lg-5" to="/">
                    <img src={require("assets/img/logo.png")} alt="load failed" />
                </Link>
                {renderNavElements(props.type)}
            </div>
        </nav>
    )
}

const renderNavElements = (type) => {
    switch (type) {
        case "home":
            break;

        case "login":
            return (
                <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                    {createNewAccount()}
                    {forgotPassword()}
                </ul>
            )
        case "signup":
            return (
                <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                    {login()}
                    {forgotPassword()}
                </ul>
            )

        case "forgotPassword":
            return (
                <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                    {login()}
                    {createNewAccount()}
                </ul>
            )
        default:
            break;
    }
}

const login = () => {
    return (
        <Navitem
            itemName="Login"
            linkTitle="Already have an account?"
            to="/login"
            itemIcon="fa fa-sign-in"
        />
    )
}

const createNewAccount = () => {
    return (
        <Navitem
            linkTitle="Create a new account"
            itemName="Create Account"
            to="/signup"
            itemIcon="fa fa-user-plus"
        />
    )
}

const forgotPassword = () => {
    return (
        <Navitem
            linkTitle="Forgot your password?"
            itemName="Forgot password"
            to="/forgotpassword"
            itemIcon="fa fa-key"
        />
    )
}

export default Navbar
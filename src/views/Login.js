import React from "react"
import Navbar from "components/navbar/Navbar.js"
import LSFcard from "components/cards/LSFcard.js"

function Login(){
    return (
        <React.Fragment>
            <Navbar type="login"/>
            <LSFcard type="login"/>
        </React.Fragment>

    )
}

export default Login
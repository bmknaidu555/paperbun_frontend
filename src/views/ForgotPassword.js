import React from "react"
import Navbar from "components/navbar/Navbar"
import LSFcard from "components/cards/LSFcard"

function ForgotPassword(){
    return (
       <React.Fragment>
            <Navbar type="forgotPassword"/>
            <LSFcard type="forgotPassword"/>
       </React.Fragment>
    )
}

export default ForgotPassword
import React from "react"
import Navbar from "components/navbar/Navbar.js"
import LSFcard from "components/cards/LSFcard.js"

function Signup(){
    return(
        <React.Fragment>
            <Navbar type="signup"/>
            <LSFcard type="signup"/>
        </React.Fragment>
    )
}

export default Signup
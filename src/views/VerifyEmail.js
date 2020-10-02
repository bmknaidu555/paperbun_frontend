import React from "react"
import {useParams} from "react-router-dom"
import Navbar from "components/navbar/Navbar.js"
import LSFcard from "components/cards/LSFcard.js"

function VerifyEmail(){
    let { verifPageToken } = useParams();
        return(
        <React.Fragment>
            <Navbar type="verifyEmail"/>
            <LSFcard type="verifyEmail" value = {verifPageToken}/>
        </React.Fragment>
    )
}

export default VerifyEmail
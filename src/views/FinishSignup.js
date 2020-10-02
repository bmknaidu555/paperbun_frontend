import React from "react"
import Navbar from "components/navbar/Navbar.js"
import LSFcard from "components/cards/LSFcard.js"
import {useParams} from "react-router-dom"

function FinishSignup() {
    let { verifPageToken, regToken } = useParams()
    return (
        <React.Fragment>
            <Navbar type="finishSignup" />
            <LSFcard type="finishSignup" verifPageToken={verifPageToken}
                regToken={regToken} />
        </React.Fragment>

    )
}

export default FinishSignup
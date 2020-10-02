import React from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {
    Button, CardBody, FormGroup, Form, Input, InputGroupAddon,
    InputGroupText, InputGroup
} from 'reactstrap'

import {validEmail} from "dataValidators/validator"
import {ErrNo} from "components/uerrors/uerrors.js"
import { getMessageFromErrNo } from "components/uerrors/uerrorMessage"

/* functional component */
function SignupForm() {

    // This is used for navigation 
    const history = useHistory();
    
    /* --------->  Intitialize  state values <--------- */

    /* This is used to initialize the defailt state values of the form */
    const initFormData = Object.freeze({
        type:"register",
        email: "",
    });

    /* Hide or unhide the pwd, cfmPwd validation status fields */
    const initialFocus = Object.freeze({
        emailFocusVal: { display: "none" },
        spinner: { display: "none" },
        submitBtn: {}
    })

    /* Updates the validation status values dynamically.*/
    const initValInfo = Object.freeze({
        /* Email */
        emailValid: false,
    })

    /* Create a state with all the default values */
    const [formData, updateFormData] = React.useState(initFormData)
    const [focusValue, updateFocus] = React.useState(initialFocus)
    const [valData, updateValData] = React.useState(initValInfo)

    const setVisibility = (field, visibility) => {

        switch (field) {
            case "email":
                updateFocus({
                    ...focusValue,
                    emailFocusVal: visibility ? { display: "" } : { display: "none" }
                })
                break;
            default:
        }
    }

    /* Handles the onFocus(focusIn), onBlur(focusOut) events. This will hide or 
    unhide the password, confirm password validation status info. */
    const handleFocus = (e) => {
        if (e.type === "focus") {
            switch (e.target.name) {
                case "email":
                    setVisibility("email", false)
                    break;
            }
        }

        else if (e.type === "blur") {
            switch (e.target.name) {
                case "email":
                    setVisibility("email", true)
                    break;
            }
        }
    }

    const updateEmailValStatus = (e) => {
        updateValData({
            ...valData,
            emailValid: validEmail(e.target.value)
        })
    }



    /* This one handles the onChange events and updates the form State values */
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "email")
            updateEmailValStatus(e)
    };

    const handleSubmit = (e) => {

        /* Once user submits the form, check email. If valid make HTTP POST request. */

        updateFocus({
            ...focusValue,
            emailFocusVal: { display: "" }
        })


        if (validEmail(formData.email)) {

            /* Hide the submit button and show the loading spinner */
            updateFocus({
                ...focusValue,
                spinner: { display: "block" }, submitBtn: { display: "none" }
            })

            /* send the signup request */
            

            
            axios.post("/api/auth/r", { email: formData.email }, 
            { timeout: 10000},
            { headers: {
                'Content-Type': 'text/json',
            }})
            
            .then(res => {
                /* Stop displaying the spinner */  
                updateFocus({
                        ...focusValue,
                        spinner: { display: "none" },
                        submitBtn: {}
                    })
                    
                var responseData = JSON.stringify(res.data)
                responseData = JSON.parse(responseData)

                //alert("Errno :" + ErrNo.EmailVerifInPending)
                   
                    if(responseData.status === "success" || 
                        responseData.errNo === ErrNo.EmailVerifInPending){
                            history.push("/signup/v/"+responseData.verifPageToken)
                    } else{
                        alert(getMessageFromErrNo(parseInt(responseData.errNo)))
                    }

                })
                
                .catch(err => {
                    console.log("Error is ", err)
                    updateFocus({
                        ...focusValue,
                        spinner: { display: "none" },
                        submitBtn: {}
                    })
                })
            e.preventDefault()
        };
    }

    /* This will render the email validation status on input field (right side) */
    const emailValStatus = () => {

        const success = "fa fa-check text-green"
        const failure = "fa fa-times text-red"
        return (
            <InputGroupAddon addonType="append" style={focusValue.emailFocusVal}>
                <InputGroupText>
                    <i className={valData.emailValid ? success : failure} ></i>
                </InputGroupText>
            </InputGroupAddon>
        )
    }

    const emailValMessage = () => {
        return (
            <div className="text-center text-danger" style={focusValue.emailFocusVal}>
                <span style={{ fontSize: "13px" }}>
                    {!valData.emailValid ? "Invalid Email Adress!!" : ""}
                </span>
            </div>
        )
    }


    /* HTML of the signup Card layout Form */
    return (
        <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center pb-4">
                <img style={{ width: "150px", height: "110px" }} src={require("assets/img/createAccount.png")} alt="" />
            </div>
           
            <div className="text-center text-muted mb-4">
                <span className="text-gray-dark">Create account</span>
                <label className="pt-3">Please enter your E-mail address to create an account</label>

            </div>
            <Form role="form">
                <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83 text-gray" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className="text-gray-dark"
                            placeholder="Email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleFocus}
                        />
                        {emailValStatus()}
                    </InputGroup>
                    {emailValMessage()}
                </FormGroup>
                <div className="text-center">
                    <div style={focusValue.spinner}>
                        <div className="spinner-grow" role="status"></div>
                        <div> <span>Creating Account ...</span></div>
                    </div>
                    <Button
                        className="mt-2"
                        color="primary"
                        type="button"
                        onClick={handleSubmit}
                        style={focusValue.submitBtn}
                    > Create account </Button>
                </div>
            </Form>
        </CardBody>
    )
}

export default SignupForm
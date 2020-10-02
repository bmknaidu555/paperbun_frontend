import React, { useEffect, useRef } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {
    Button, CardBody, FormGroup, Form, Input, InputGroupAddon,
    InputGroupText, InputGroup
} from 'reactstrap'

import {
    isPwd8CharLong, isPwdHasSpecialChar, isPwdHasLcaseLetter,
    isPwdHasUCaseLetter, isPwdHasDigit, validUsername,
    validPassword
} from "dataValidators/validator"

/* functional component */
function FinishSignupForm(props) {

    // This is used for navigation 
    const history = useHistory();
    /* ------->  Styles <-------- */

    /* This style applies to validation label. */
    const valLabelStyle = {
        fontSize: "12px",
        display: "block"
    }

    /* --------->  Intitialize  state values <--------- */

    /* This is used to initialize the default state values of the form */
    const initFormData = Object.freeze({
        username: "",
        password: "",
        confirmPassword: "",
    });

    /* Hide or unhide the pwd, cfmPwd validation status fields */
    const initialFocus = Object.freeze({
        usernameFocusVal: { display: "none" },
        pwdFocusVal: { display: "none" },

        /* This belongs to tick mark on the pwd field */
        pwdFocusOnInputVal: { display: "none" },
        usernameFocusOnInputVal: {display:"none"},
        cfmPwdFocusVal: { display: "none" },
        spinner: { display: "none" },
        submitBtn: {}
    })

    /* Updates the validation status values dynamically.*/
    const initValInfo = Object.freeze({
        /* Username */
        usernameValid: false,
        userNameAvailable: false,
        /* Password */
        char8Long: false, lCaseLetter: false, digit: false,
        uCaseLetter: false, specialCharacter: false,
        /* Confirm Password */
        pwdMatching: false,
        usernameStatus: "Checking ...",
    })

    const initPageStatus = Object.freeze({
        loading: { display: "block" },
        loadingFinished: { display: "none" }
    })

    /* Create a state with all the default values */
    const [formData, updateFormData] = React.useState(initFormData)
    const [focusValue, updateFocus] = React.useState(initialFocus)
    const [valData, updateValData] = React.useState(initValInfo)
    const [pageStatus, updatePageStatus] = React.useState(initPageStatus)


    /* Server functions */

    function checkUsernameAvailability(username) {
        var reqInProgress = false;
        updateValData({
            ...valData,
            userNameAvailable: false,
            usernameStatus: "Checking ...",
            usernameValid: validUsername(username)
        })
        if (!reqInProgress) {
            reqInProgress = true;
            axios.post("/api/auth/availability/username",
                { username: username },
                { timeout: 10000 },
                { headers: { 'Content-Type': 'text/json' } }
            ).then(res => {
                reqInProgress = false;
                /* Loading completed, display the info */
                const responseData = JSON.parse(JSON.stringify(res.data))
                if (responseData.status == "success") {
                    console.log(responseData.availability)
                    updateValData({
                        ...valData,
                        userNameAvailable: responseData.availability,
                        usernameStatus: responseData.availability? "Available":"Already taken",
                        usernameValid: validUsername(username)
                    })
                } else {
                    history.push("/404")
                }
            })
        }
        reqInProgress = false;
    }

    useEffect(() => {
        axios.post("/api/auth/c/",
            { verifPageToken: props.verifPageToken, regToken: props.regToken },
            { timeout: 10000 },
            { headers: { 'Content-Type': 'text/json' } }
        ).then(res => {
            /* Loading completed, display the info */
            const responseData = JSON.parse(JSON.stringify(res.data))
            if (responseData.status === "success") {
                updatePageStatus({
                    ...pageStatus,
                    loading: { display: "none" },
                    loadingFinished: { display: "block" }
                })
            } else {
                history.push("/404")
            }
        })
        return function cleanup() {

        }
    }, [])

    const setVisibilityValStatus = (field, visibility) => {

        switch (field) {
            case "username":
                updateFocus({
                    ...focusValue,
                    usernameFocusOnInputVal: visibility ? { display: "" } : { display: "none" },
                    usernameFocusVal: visibility ? {display:"none"}: {display: ""}
                })
                break;
            case "password":
                updateFocus({
                    ...focusValue,
                    pwdFocusOnInputVal: visibility ? { display: "" } : { display: "none" },
                    pwdFocusVal: visibility ? { display: "none" } : { display: "" }
                })
                break;
            case "confirmPassword":
                updateFocus({
                    ...focusValue,
                    cfmPwdFocusVal: visibility ? { display: "" } : { display: "none" }

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
                case "username":
                    setVisibilityValStatus("username", false)
                    break;
                case "password":
                    setVisibilityValStatus("password", false)
                    break
                case "confirmPassword":
                    setVisibilityValStatus("confirmPassword", false)
                    break;
                default:

            }
        }

        else if (e.type === "blur") {
            switch (e.target.name) {
                case "username":
                    setVisibilityValStatus("username", true)
                    break;
                case "password":
                    setVisibilityValStatus("password", true)
                    break
                case "confirmPassword":
                    setVisibilityValStatus("confirmPassword", true)
                    break;
            }
        }
    }

    const updateUsernameValStatus = (e) => {
        var username = e.target.value
        if (username.length < 6){
            updateValData({
                ...valData,
                userNameAvailable: false,
                usernameStatus: "Invalid length",
                usernameValid: false
            })
            return 
        }
        
        checkUsernameAvailability(e.target.value)
    }

    /* This will updates the label in the pwdValidationStatus after validation.
    The labels are changed based on the onChange events of pwd, cfmpwd fields */
    const updatePwdValStatus = (e) => {
        updateValData({
            ...valData,
            specialCharacter: isPwdHasSpecialChar(e.target.value),
            char8Long: isPwd8CharLong(e.target.value),
            lCaseLetter: isPwdHasLcaseLetter(e.target.value),
            uCaseLetter: isPwdHasUCaseLetter(e.target.value),
            digit: isPwdHasDigit(e.target.value),
            pwdMatching: (e.target.value === formData.confirmPassword),
        })
    }

    /* Set the passsword matching as true if value in pwd, cfmpwd fields  are same */
    const updatecfmPwdValStatus = (e) => {
        updateValData({
            ...valData,
            pwdMatching: (e.target.value === formData.password)
        })
    }

    /* This one handles the onChange events and updates the form State values */
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "username")
            updateUsernameValStatus(e)
        if (e.target.name === "password")
            updatePwdValStatus(e)
        else if (e.target.name === "confirmPassword")
            updatecfmPwdValStatus(e)
    };

    const handleSubmit = (e) => {

        /* Once user submits the form, check username, pwd, 
            cfmpwd is valid or not. If valid make HTTP POST request. */
        var isPasswordValid = validPassword(formData.password)

        updateFocus({
            ...focusValue,
            usernameFocusVal: (valData.usernameValid && valData.userNameAvailable)?{ display: "none" }:{display:""},
            pwdFocusVal: isPasswordValid ? { display: "none" } : { display: "" },
            pwdFocusOnInputVal: { display: "" },
            cfmPwdFocusVal: { display: "" },
            checkBoxVal: formData.checkbox ? { display: "none" } : { display: "" }
        })


        if (valData.usernameValid && valData.userNameAvailable && isPasswordValid &&
           
        (formData.password === formData.confirmPassword)) {
            /* Hide the submit button and show the loading spinner */
            updateFocus({
                ...focusValue,
                spinner: { display: "block" }, submitBtn: { display: "none" }
            })

            /* send the signup request */
            axios.post("/auth/", { formData }, { timeout: 10 })
                .then(res => {
                    updateFocus({
                        ...focusValue,
                        spinner: { display: "none" },
                        submitBtn: {}
                    })
                    history.push("/login");
                })
                .catch(err => {
                    console.log("unable to contact server")
                    updateFocus({
                        ...focusValue,
                        spinner: { display: "none" },
                        submitBtn: {}
                    })
                })
            e.preventDefault()
        };
    }

    /* This will render the email validation status */
    const usernameValStatusOnInput = () => {

        const success = "fa fa-check text-green"
        const failure = "fa fa-times text-red"

        return (
        
            <InputGroupAddon addonType="append" style={focusValue.usernameFocusOnInputVal}>
                <InputGroupText>
                    <i className={(valData.usernameValid & valData.userNameAvailable) ? success : failure} ></i>
                </InputGroupText>
            </InputGroupAddon>
        )
    }


    const pwdValStatusOnInput = () => {
        const success = "fa fa-check text-green"
        const failure = "fa fa-times text-red"
        return (
            <InputGroupAddon addonType="append" style={focusValue.pwdFocusOnInputVal}>
                <InputGroupText>
                    <i className={(valData.char8Long && valData.lCaseLetter &&
                        valData.digit && valData.uCaseLetter &&
                        valData.specialCharacter) ? success : failure} ></i>
                </InputGroupText>
            </InputGroupAddon>
        )
    }

    const usernameValStatus = () => {
        const success = "fa fa-check-circle text-success mr-2"
        const failure = "fa fa-exclamation-circle text-red mr-2"

        /* This will render the pwdStautsLabel (single) */
        const userValStatusLabel = (result, data) => {
            return (
                <span style={valLabelStyle}>
                    <i className={result ? success : failure} ></i>
                    {data}
                </span>
            )
        }
        return (
            <div className="text-left mb-4" style={focusValue.usernameFocusVal} >
                <div className="pl-3">
                    {userValStatusLabel(valData.userNameAvailable, "Availability Status: "+ valData.usernameStatus)}
                    {userValStatusLabel(valData.usernameValid, "6 - 18 Characters [a-z, 0-9], Must start with [a-z]")}
                </div>
            </div>
        )
    }

    /* This will render the pwdStautsLabel (Group) */
    const pwdValStatus = () => {

        const success = "fa fa-check-circle text-success mr-2"
        const failure = "fa fa-exclamation-circle text-red mr-2"

        /* This will render the pwdStautsLabel (single) */
        const pwdValStatusLabel = (result, data) => {
            return (
                <span style={valLabelStyle}>
                    <i className={result ? success : failure} ></i>
                    {data}
                </span>
            )
        }
        return (
            <div className="text-left" style={focusValue.pwdFocusVal}>
                <span style={{ fontSize: "13px" }}> Password must contain :</span>
                <div className="pt-1 pl-3">
                    {pwdValStatusLabel(valData.char8Long, "8 Character long")}
                    {pwdValStatusLabel(valData.lCaseLetter, "Lower-case letter [a-z]")}
                    {pwdValStatusLabel(valData.uCaseLetter, "Upper-case letter [A-z]")}
                    {pwdValStatusLabel(valData.digit, "Digit [0-9]")}
                    {pwdValStatusLabel(valData.specialCharacter, "Special character")}
                </div>
            </div>
        )
    }

    const cfmPwdValStatus = () => {
        const success = "fa fa-check text-green"
        const failure = "fa fa-times text-red"
        return (
            <InputGroupAddon addonType="append" style={focusValue.cfmPwdFocusVal}>
                <InputGroupText>
                    <i className={valData.pwdMatching ? success : failure} ></i>
                </InputGroupText>
            </InputGroupAddon>
        )
    }



    /* HTML of the signup Card layout Form */
    return (
        <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center" style={pageStatus.loading}>
                <div className="spinner-grow" role="status"></div>
                <div><span>Validating Info ...</span></div>
            </div>
            <div style={pageStatus.loadingFinished}>
                <div className="text-center pb-4">
                    <img style={{ width: "150px", height: "110px" }} src={require("assets/img/createAccount.png")} alt="" />
                </div>
                <div className="text-center text-muted mb-4">
                    <span className="text-gray-dark">Activate account</span>
                </div>
                <Form role="form" >
                    <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-user text-gray" />

                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="text-gray-dark"
                                placeholder="Username"
                                type="username"
                                name="username"
                                autoComplete="off"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                            />
                            {usernameValStatusOnInput()}
                        </InputGroup>

                    </FormGroup>
                    {usernameValStatus()}

                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open text-gray" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="text-gray-dark"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                                autoComplete="off"
                            />
                            {pwdValStatusOnInput()}
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open text-gray" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="text-gray-dark"
                                placeholder="Re-enter Password"
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleFocus}
                                autoComplete="off" />
                            {cfmPwdValStatus()}
                        </InputGroup>
                    </FormGroup>

                    {pwdValStatus()}


                    <div className="text-center">
                        <div style={focusValue.spinner}>
                            <div className="spinner-grow" role="status"></div>
                            <div> <span>Creating Account ...</span></div>
                        </div>
                        <Button
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={handleSubmit}
                            style={focusValue.submitBtn}
                        > Finish signup </Button>
                    </div>

                </Form>
            </div>
        </CardBody>
    )
}

export default FinishSignupForm
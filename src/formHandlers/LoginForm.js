import React from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import {
    Button, CardBody, FormGroup, Form, Input, InputGroupAddon,
    InputGroupText, InputGroup
} from 'reactstrap'

import { validEmail, validPassword } from "dataValidators/validator"

function LoginForm() {

    // This is used for navigation 
    const history = useHistory();
    /* ------->  Styles <-------- */

    /* This style applies to validation label. */
    const valLabelStyle = {
        fontSize: "14px",
        display: "block"
    }

    /* --------->  Intitialize  state values <--------- */

    /* This is used to initialize the defailt state values of the form */
    const initFormData = Object.freeze({
        email: "",
        password: "",
        rememberMe: false
    });

    const initComData = Object.freeze({
        valStatusLabelFocus: {display:"none"},
        valStatusLabelData : ""
    })

    const [formData, updateFormData] = React.useState(initFormData)
    const [comData, updateComData] = React.useState(initComData)

    /* ----> handleChange is called when there is a change in username & password  <---- */
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = (e) => {
        updateFormData({
            ...formData,
            rememberMe: e.target.checked
        })
    }

    const  alterValStatus = (visibility, data) => {
        updateComData({...comData, 
            valStatusLabelFocus : visibility ? {} :{display:"none"},
            valStatusLabelData: data})
    }

    const handleSubmit = (e) => {

        if(!validEmail(formData.email)){
            alterValStatus(true, "Email is not valid")
        }else if(!validPassword(formData.password)){
            alterValStatus(true, "Password is not valid")
        } else{
            alterValStatus(false, "")
            alert(formData.rememberMe)
        }
       



        /*axios.post("/api/scaleup", { formData })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        e.preventDefault()
        console.log(formData.email);*/
    };

    /* Validation chech marks on input fields */
    const valStatusLabel = () => {

        return (
            <div className="text-center mt-3" style={comData.valStatusLabelFocus}>
            <span style={valLabelStyle}>
                <i className="fa fa-exclamation-circle text-red mr-2" ></i>
                {comData.valStatusLabelData}
            </span>
            </div>
        )
    }
    return (
        <CardBody className="px-lg-5 py-lg-5">

            <div className="text-center pb-4">
                <img style={{ width: "150px", height: "110px" }} src={require("assets/img/login.png")} alt="" />
            </div>
            <div className="text-center text-muted mb-4">
                <label className="text-gray-dark">
                    Login with registered email
            </label>
            </div>

            <Form role="form">
                <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83 text-gray" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            className="text-gray-dark"
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={handleChange}
                        />
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
                            placeholder="Password"
                            type="password"
                            name="password"
                            autoComplete="off"
                            className="text-gray-dark"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormGroup>


                <div className="custom-control custom-control-alternative custom-checkbox">
                    <input className="custom-control-input" 
                    id=" customCheckLogin" 
                    type="checkbox"
                    onClick={handleClick}
                />
                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                        <span>Remember me</span>
                    </label>
                </div>
                {valStatusLabel("Email address is not valid")}
                <div className="text-center">
                    <Button className="my-4" color="primary" type="button" onClick={handleSubmit}> Sign in </Button>
                </div>
            </Form>
        </CardBody>
    )
}

export default LoginForm
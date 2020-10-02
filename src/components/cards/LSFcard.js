import React from "react"
import { Link } from "react-router-dom"
import {
    Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon,
    InputGroupText, InputGroup, Container, Row, Col
} from 'reactstrap'

import LoginForm from "formHandlers/LoginForm"
import SignupForm from "formHandlers/SignupForm"
import FinishSignupForm from "formHandlers/FinishSignupForm"
import VerifyEmail from "formHandlers/VerifyEmail"

/* This document will render the cards of login, register & forgot password page */

function LSFcard(props) {
    return (
        <section className="section section-shaped section-lg bg-pattern-image">
            <Container className="pt-lg-3">
                <Row className="justify-content-center">
                    <Col lg="5">

                        <Card className="bg-secondary shadow border-0">
                            {/*loadCardHeader(props.type)*/}
                            {loadCardBody(props.type, props)}
                        </Card>
                        {loadLSFFooter(props.type)}


                    </Col>
                </Row>
            </Container>
        </section>
    )
}

const loadCardBody = (type, props) => {

    if (type === "login")
        return (<LoginForm/>)
    else if (type === "signup")
        return (<SignupForm/>)
    else if (type === "verifyEmail")
        return (VerifyEmail(props.value))
    else if (type === "finishSignup"){
        return (FinishSignupForm(props))
    }
    else if (type === "forgotPassword")
        return forgotpasswordCardBody();
}

const forgotpasswordCardBody = () => {
    return (
        <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center pb-4">
                <img style={{ width: "150px", height: "110px" }} src={require("assets/img/forgotpassword.png")} alt="" />
            </div>
            <div className="text-center text-muted mb-4">
                <span className="text-gray-dark">Forgot your password?</span>
                <label className="pt-3">Please enter your registered E-mail address to reset the password</label>
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
                        />
                    </InputGroup>
                </FormGroup>
                <div className="text-center">
                    <Button className="mt-4" color="primary" type="button">Reset password</Button>
                </div>
            </Form>
        </CardBody>
    )
}


const loadLSFFooter = (type) => {

    const cf_createAccount = (type) => {
        const styles = (type === "forgotPassword")?"":"text-right"
        return (
            <Col className={styles} xs="6">
                <Link className="text-light" to="/signup">
                    <small className="text-gray">Create new account</small>
                </Link>
            </Col>
        )
    }

    const cf_signin = (type) => {
        
        return (
            <Col className= "text-right" xs="6">
                <Link className="text-light" to="/login">
                    <small className="text-gray">Already have an account?</small>
                </Link>
            </Col>
        )
    }

    const cf_forgotPassword = () => {
        return (
            <Col xs="6">
                <Link className="text-light" to="/forgotpassword">
                    <small className="text-gray">Forgot password?</small>
                </Link>
            </Col>
        )
    }

    if (type === "login") {
        return (
            <Row className="mt-3">
                {cf_forgotPassword()}
                {cf_createAccount()}
            </Row>
        )
    }
    else if (type === "signup") {
        return (
            <Row className="mt-3">
                {cf_forgotPassword()}
                {cf_signin()}
            </Row>
        )
    }
    else if (type === "forgotPassword") {
        return (
            <Row className="mt-3">
                {cf_createAccount("forgotPassword")}
                {cf_signin()}
            </Row>
        )
    }
}

export default LSFcard
import React from "react"
import Login from "./Login.js"
import Signup from "./Signup.js"
import FinishSignup from "./FinishSignup.js"
import Home from "./Home.js"
import Forgotpassword from './ForgotPassword.js'
import Editor from './Editor'
import VerifyEmail from './VerifyEmail.js'
import E404 from './E404.js'


import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App(){
    return(
        <Router>
                <Switch>
                    <React.Fragment>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signup" exact component={Signup}/>
                        <Route path="/signup/v/:verifPageToken" exact component={VerifyEmail}/>
                        <Route path="/signup/c/:verifPageToken/:regToken" exact component={FinishSignup}/>
                        <Route path="/forgotpassword" exact component={Forgotpassword}/>
                        <Route path="/e/new" exact component={Editor}/>
                        <Route path="/404" exact component={E404}/>
                    </React.Fragment>
                </Switch>
        </Router>
    )
}

export default App
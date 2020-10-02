import React, { useEffect, useRef } from "react"
import axios from "axios"
import {
    CardBody, 
} from 'reactstrap'
import { useHistory } from "react-router-dom"


function VerifyEmail(verifPageToken) {

    const history = useHistory();
    var navigated = useRef(0);
    var inst = 0;
    const initVisibility = Object.freeze({
        loading: { display: "block" },
        loadingFinished: { display: "none" },
        resendingMail :{display:"none"},
        mailSentSuccessful : {display:"none"}
    })

    const [visibility, updateVisibility] = React.useState(initVisibility)
    const [buttonInfo, updateButtonInfo] = React.useState(Object.freeze(
        {info:"RESEND VERIFICATION LINK", state:"disabled"}))


    function disableButtonForNSeconds(n){
        function startUpdateTimeOnButton() {
            if (!navigated.current)
            updateButtonInfo({
                ...buttonInfo,
                info: "RETRY AFTER "+ n+ " Seconds",
                state: "disabled"
            })
            n = n - 1
        }

        function stopUpdateTimeOnButton(){
            clearInterval(inst);
            if (!navigated.current)
            updateButtonInfo({
                ...buttonInfo,
                info: "RESEND VERIFICATION LINK",
                state: ""
            })  

            updateVisibility({
                ...visibility,
                loading: { display: "none" },
                loadingFinished: { display: "block" },
                resendingMail :{display:"none"},
                mailSentSuccessful : {display:"none"},
            })
        }

        inst = setInterval(startUpdateTimeOnButton, 1000);
        setTimeout(stopUpdateTimeOnButton, n * 1000)
    }

    
    function btn_resendVerifMailClick(){
        updateVisibility({
            ...visibility,
            resendingMail:{display:"block"},
         })

        /* Disable the button and make loading visible */
        axios.post("/api/auth/v/", {verifPageToken:verifPageToken}, {timeout:10000},
        {header:{
            'Content-Type':'text/json',
        }}).then(res => {
            updateVisibility({ ...visibility, 
                resendingMail:{display:"none"},
                mailSentSuccessful : {display:"block"},
            })
            const responseData = JSON.parse(JSON.stringify(res.data))
            if (responseData.status === "success"){
                disableButtonForNSeconds(responseData.waitTime);
            }
            else{
                history.push("/404")
            }           
        })
    }

    useEffect(()=>{
        axios.post("/api/auth/v/",
                {verifPageToken: verifPageToken}, 
                {timeout:10000},
                {headers: {'Content-Type': 'text/json'}}
        ).then(res => {
            /* Loading completed, display the info */
            updateVisibility({
                ...visibility,
                loading: {display:"none"},
                loadingFinished: {display:"block"}
            });

            const responseData = JSON.parse(JSON.stringify(res.data))

            if(responseData.status === "success"){
                /* Enable the button */
                //updateButtonInfo({ ...buttonInfo,state:""})
                disableButtonForNSeconds(responseData.waitTime);
                
            } else{
                history.push("/404")
            }
        })
        return function cleanup() {
            navigated.current = true;
        }
    }, [])


    return (

<CardBody className="px-lg-5 py-lg-5">
        <div className="text-center" style={visibility.loading}>
            <div className="spinner-grow" role="status"></div>
            <div> <span>Fetching Details ...</span></div>
        </div>
        
        <div className="text-center" style={visibility.loadingFinished}>
            <span>Thank you for registering with us!! </span> 
            <br/>
            <br/>
            <span>We have sent a <b>verification link</b> to your registered email address. 
                Please click on it to <b>activate your account</b>.</span>
            <br/>
            <br/>
            <span>If you didn't receive the verification mail, 
                Please click on the below button, to receive it again.</span>
            <br/>
            <br/>
            <span><b>Note: </b> Don't forget to check in spam section.</span>
            <div className="text-danger text-center">
                <span  id="errorMessage"></span>
            </div>
            <div id="successMessage" className="text-center d-none">
                <i className="fas fa-check-circle text-green"></i>
                <label> <span>Verification mail sent</span></label>
            </div>
            <div id="loadingSpinner" className="text-center d-none">
                <div className="spinner-grow" role="status"></div>
                    <div> <span>Resending the verification link...</span></div>
                </div>

                <div className="text-center">
                    <button id="btnResendVerificationMail"
                        type="button"
                        onClick={btn_resendVerifMailClick}
                        className="btn btn-primary mt-4" 
                        disabled={buttonInfo.state}>
                        {buttonInfo.info}
                    </button>
                    <div style={visibility.resendingMail} >
                        <div className="spinner-grow mt-3" role="status"></div>
                        <div> <span>Resending mail ...</span></div>
                    </div>
                    <div class="mt-3 text-center" style={visibility.mailSentSuccessful}>
                        <i className="fa fa-check text-green" />
                         <span> Mail successfully sent</span>
                    </div>
                </div>
        </div>        
        </CardBody>
    )
}

export default VerifyEmail
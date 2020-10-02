import {ErrNo} from "components/uerrors/uerrors.js"

export function getMessageFromErrNo(errNo) {
    console.log(errNo)
    switch(errNo){
        case ErrNo.EmailAlreadyExists:
            return "Email Id already registered with us"
        case ErrNo.EmailVerifInPending:
            return "Email verification is in pending"
        default:
            return "Unknown error"
    }
}
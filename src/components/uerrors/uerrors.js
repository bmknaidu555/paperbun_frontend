var start = 1001

export const ErrNo = {
    InvalidRequest : start,
	UnableToRegister : ++start,
	UnableToConnectToDB : ++start,
	InvalidEmail: ++start,
	InvalidPassword: ++start,
	UsernameAlreadyExist :++start,
	EmailAlreadyExists: ++start,
	EmailVerifInPending: ++start,
}
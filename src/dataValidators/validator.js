export function isPwd8CharLong(password) {
    return new RegExp("^.{8,}$").test(password);
}

export function isPwdHasSpecialChar(password) {
    return new RegExp("[~`!@#$%\\^&\\*\\(\\)\\-\\_\\+\\=\\{\\}\\[\\]\\|\\\\\\:;\"'<>,\\.\\?]").test(password);
}

export function isPwdHasLcaseLetter(password) {
    return new RegExp("[a-z]").test(password);
}

export function isPwdHasUCaseLetter(password) {
    return new RegExp("[A-Z]").test(password);
}

export function isPwdHasDigit(password) {
    return new RegExp("[0-9]").test(password);
}

export function validEmail(email) {
    var a = '[0-9a-zA-Z\\!#\\$%&\'\\*\\+\\-\\/\\=\\?\\^_`\\{\\|\\}~("")]+?',
    e = ["^((", a, "\\.)*", a, ")"].join("") + "@" + ["(?:(?:", "(:?[0-9a-zA-Z\\-]+\\.)*[0-9a-zA-Z\\-]+", ")|(?:", "\\[.+?\\]", "))$"].join(""),
    n = new RegExp('"[\\(\\),:;<>@\\[\\](\\\\\\\\)(\\\\")0-9a-zA-Z\\!#\\$%&\'\\*\\+-\\/\\=\\?\\^_`\\{\\|\\}~\\.\\s]*"', "g"),
    t = new RegExp(e, "g");
    t.lastIndex = 0
    a = a.replace(n, '""')
    return t.test(email)   
}

export function validUsername(username) {
    return new RegExp("^[A-Za-z][A-Za-z0-9]{5,17}$").test(username)
}


export function validPassword(password) {
    return (
        isPwd8CharLong(password) && isPwdHasSpecialChar(password) &&
        isPwdHasLcaseLetter(password) && isPwdHasUCaseLetter(password) &&
        isPwdHasDigit(password)
    )
}
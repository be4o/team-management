function __(id){
    return document.getElementById(id);
}

function checkEmail(email)
{
    if(email == '' || email == undefined || email == null || typeof email !== 'string')
        return false;
    return /^[a-zA-z0-9.-]{4,}@[a-zA-z]+\.com$/.test(email);
}
function checkPassword(psw)
{
    if(psw == '' || psw == undefined || psw == null || typeof psw !== 'string' || psw.length < 8 || !psw.match(/[@!#$%^&*()]+/))
        return false;
    return true;
}

function validate(email, psw){
    let validornot = true;
    if(checkEmail(email)){
        __('email-error').innerText = ""        
    }else{
        __('email-error').innerText = "*please enter a valid email address."
        validornot = false;
    }
    if(checkPassword(psw)){
        __('password-error').innerText = "";
    }else{
        __('password-error').innerText = "*Password must be greather than 8 character and contains at least one special character @!#$%^&*()"
        validornot = false;
    }
    return validornot;

}

function login(e)
{
    //get email value
    let email = __('email').value;
    let psw = __('password').value;
    // debugger
    if(validate(email, psw))
    {
        if(__('rememberme').checked){
            //store data in the local storage if remember me checked                
            localStorage.setItem('email', email)
            localStorage.setItem('password', psw)
            if(sessionStorage.email)
                sessionStorage.removeItem('email')
            if(sessionStorage.password)
                sessionStorage.removeItem('password')
        }else{
            //clear localstorage data if found when remember me not checked              
            if(localStorage.getItem('email'))
                localStorage.removeItem('email')
            if(localStorage.getItem('password'))
                localStorage.removeItem('password')
            //just store them in session storage
            sessionStorage.setItem("email", email)
            sessionStorage.setItem("password", psw)
        }
        if(email.indexOf('emp') >= 0){
            e.preventDefault();
            location.href = "employee/index.html";
        }else if(email.indexOf('super') >= 0){
            e.preventDefault();
            location.href = "supervisor/index.html";
        }
    }else{
        e.preventDefault();
    }
}

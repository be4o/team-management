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
function storeLocalStorage(email, psw)
{
    localStorage.setItem('email', email)
    localStorage.setItem('password', psw)
    if(sessionStorage.email)
        sessionStorage.removeItem('email')
    if(sessionStorage.password)
        sessionStorage.removeItem('password')
}
function storeSessionStorage(email, psw)
{
    if(localStorage.getItem('email'))
        localStorage.removeItem('email')
    if(localStorage.getItem('password'))
        localStorage.removeItem('password')
    //just store them in session storage
    sessionStorage.setItem("email", email)
    sessionStorage.setItem("password", psw)
}
function findEmailPsw(obj, email, psw)
{
    console.log(obj)
}
function redirectLogin(email, psw)
{
    let userType = __("member-type").options[__("member-type").selectedIndex].value
    switch(userType){
        case "1":
            //employee
            getData('data/employees.json', email, psw)
            __("auth-error").innerHTML = "Invalid User email or password";
            break;
        case "2":
            //supervisor
            getData('data/supervisors.json', email, psw)
            __("auth-error").innerHTML = "Invalid User email or password";
            break;
        case "3":
            //admin
            getData('data/admins.json', email, psw)
            __("auth-error").innerHTML = "Invalid User email or password";
            break;
        default:
            throw new Error("Wrong data value");
    }
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
            e.preventDefault();
            storeLocalStorage(email, psw);
            redirectLogin(email, psw);

        }else{
            //clear localstorage data if found when remember me not checked              
            e.preventDefault();
            storeSessionStorage(email, psw);
            redirectLogin(email, psw);
        }
    }else{
        e.preventDefault();
    }
}

function logout(event)
{
    if(confirm("are you sure?")){
        if(localStorage.getItem('email'))
            localStorage.removeItem('email')
        if(localStorage.getItem('password'))
            localStorage.removeItem('password')
        if(sessionStorage.email)
            sessionStorage.removeItem('email')
        if(sessionStorage.password)
            sessionStorage.removeItem('password')
        location.href = "/ITI/JS/Project";
    }
   return false; 
}
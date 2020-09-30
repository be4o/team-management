function checkEmailPsw(email, psw, obj)
{
    for(let i =0; i< obj.length; i++)
        if(obj[i].email == email && obj[i].password == psw){
            if(obj[i].type == 1)
                location.href = "employee/index.html";
            else if(obj[i].type == 2)
                location.href = "supervisor/index.html";
            else if(obj[i].type == 3)
                location.href = "admin/index.html";
        }
}
/*@getData function

*/

function getData(url, email, psw)
{
    if(XMLHttpRequest)
    {
        var xhr = new XMLHttpRequest();
        var obj;
        xhr.open('GET', url)
        xhr.onreadystatechange = function(){
            // debugger
            if(xhr.readyState == 4 && xhr.status == 200){                
                // console.log(xhr.responseText)
                checkEmailPsw(email, psw, JSON.parse(xhr.responseText).data)
            }
        }
        xhr.send();
        xhr.onerror = function(){
            throw Error("Error loading the file")
        }
    }else{
        throw new Error("Sorry, your broswer does not support ajax requests")
    }
}
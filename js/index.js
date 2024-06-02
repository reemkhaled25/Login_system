let username=document.getElementById("nameinput");
let useremail=document.getElementById("emailinput");
let userpassword=document.getElementById("passwordinput");
let alertmess=document.getElementById("alert")
let loginalertmess=document.getElementById("loginalert")
let registerbtn=document.getElementById("registerbtn");
let loginemail=document.getElementById("loginemail");
let loginpassword=document.getElementById("loginpassword");
let loginbtn=document.getElementById("loginbtn");
let profilemessage=document.getElementById("profilemess");
let userslist=[];
if(localStorage.getItem('users')){
    userslist=JSON.parse(localStorage.getItem('users'))
}
function register(){
    if(username.value && useremail.value && userpassword.value){
        if(validation(username.value,useremail.value,userpassword.value)){
            let user1=userslist.find((el)=>{
                if(el.name==username.value&&el.email==useremail.value){
                    return el;
                }
            })
            if(user1==undefined){
                let user={
                    name:username.value,
                    email:useremail.value,
                    password:userpassword.value,
                }
                userslist.push(user);
                localStorage.setItem('users',JSON.stringify(userslist));              
                alertmess.classList.add("text-success");
                alertmess.innerHTML="Success";
                clearform();
            }else{
                alertmess.classList.add("text-danger")
                alertmess.innerHTML="email already exists"
                clearform()
            }
            
        }else{
            alertmess.classList.add("text-danger")
            alertmess.innerHTML="Something wrong, invalid username , email and password"
            clearform()
        }

    }else{
        alertmess.classList.add("text-danger")
        alertmess.innerHTML="All inputs is required"
        clearform()
    }
}
function login(){
    
    if(loginemail.value && loginpassword.value){
        if(isvalid(loginemail.value,loginpassword.value)){
            let user1=userslist.filter((el)=>{
                if(el.email==loginemail.value){
                    return el;
                }
            })
            if(user1==[]){
                loginalertmess.classList.add("text-danger")
                loginalertmess.innerHTML="This account not found , Please SignUp first"
                clearform()


            }else{
                let index;
                for (let i=0;i<userslist.length;i++){
                    if(userslist[i].email==loginemail.value&&userslist[i].password==loginpassword.value){
                        index=i;
                        
                    }                   
                }
                let currentuser = userslist[index].name;
                localStorage.setItem("currentuser",currentuser)
                open("homepage.html")
                clearform()
            }           
        }else{
            loginalertmess.classList.add("text-danger")
            loginalertmess.innerHTML="Something wrong, invalid username , email and password"
            clearform()
        }
    }else{
        loginalertmess.classList.add("text-danger")
        loginalertmess.innerHTML="All inputs is required"
        clearform()
    }
}
function isvalid(email,password){

    let emailregex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordregex=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(emailregex.test(email)&&passwordregex.test(password)){
        return true;
    }else{
        return false;
    }
}
function validation(name,email,password){

    let nameregex=/^[a-zA-Z0-9]+$/;
    let emailregex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordregex=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(nameregex.test(name)&&emailregex.test(email)&&passwordregex.test(password)){
        return true;
    }else{
        return false;
    }
}
function clearform(){
    username.value="";
    useremail.value="";
    userpassword.value="";
}
function logout(){
    localStorage.removeItem("currentuser");
    open("index.html")
}

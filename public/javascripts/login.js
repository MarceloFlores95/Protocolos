// const passport = require("passport");

function register() {
    console.log("Function Register")
    let registerForm = document.querySelector("#register");
    registerForm.action = '/login'
    registerForm.method ='post'
    console.log(registerForm)
    registerButton = registerForm.querySelector("#registerButton");
    // console.log(registerButton)
    
    registerButton.addEventListener('click', (event) => {

        event.preventDefault();
        let name = document.getElementById("userName").value;
        let email = document.getElementById("userEmail").value;
        let password = document.getElementById("userPassword").value;
        
        if((name != "") && (email != "") && (password != "")) {
            // console.log(email)
            // console.log(name)
            // console.log(password)
            let newUser = {
                name: name,
                email: email,
                password: password
            }
            console.log(newUser)
            registerForm.submit(newUser)
            
        } else {
            alert("Favor de llenar todos los campos")
        }
    }, false)
    
    /*

    */
}

function login() {
    console.log("Function Login")
}

function init() {
    //console.log("Function init")
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");

    let registerButton = document.querySelector(".registerButton");
    let loginButton = document.querySelector(".loginButton");

    loginButton.style.backgroundColor= "#CACACA"

    registerButton.addEventListener('click',(event) => {
        event.preventDefault();
        x.style.left = "-400px";
        y.style.left = "50px";
        z.style.left = "110px"
        // register();
        registerButton.style.backgroundColor= "#CACACA"
        loginButton.style.backgroundColor= "white"
    },false)

    loginButton.addEventListener('click',(event) => {
        x.style.left = "50px";
        y.style.left = "450px";
        z.style.left = "0px"
        // login();
        registerButton.style.backgroundColor= "white"
        loginButton.style.backgroundColor= "#CACACA"

    },false)
}

init();
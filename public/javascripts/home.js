function publishComment() {
    let userID = document.getElementById('userID').innerHTML
    let comment = document.getElementById("textAreaForm").value;
    let userEmail = document.getElementById('userEmail').innerHTML
    // let image = document.
    console.log(comment)
    console.log(userID)
    console.log(userEmail)
    
    let url = `home/${userEmail}`;
        
    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(comment)
    }
    console.log(settings)
    
    fetch( url, settings )
    .then( response => {
        console.log("hola")
        console.log(response)
        if( response.ok ){
            return response.json();
        }
        throw new Error( response.statusText );
    })
    .then( responseJSON => {
        console.log(responseJSON)
    })
    .catch( err => {
        console.log(err)
    },{once:true});



}

function init() {
    let newVar = document.getElementById("publisButton");
    newVar.addEventListener("click",event => {
        event.preventDefault();
        publishComment()
    })
}

init()
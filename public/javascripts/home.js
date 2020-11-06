function publishComment() {
    let userID = document.getElementById('userID').innerHTML
    let comment = document.getElementById("textAreaForm").value;
    let userEmail = document.getElementById('userEmail').innerHTML
    let userName = document.getElementById('userName').innerHTML
    // let image = document.
    // console.log(comment)
    // console.log(userID)
    // console.log(userEmail)

    let data = {
        userName: userName,
        userID: userID,
        userEmail: userEmail,
        userComment: comment
    }

    let url = `home/postComment`;
    let settings = {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
    /*    
    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(comment)
    }
    console.log(settings)
    */
    fetch( url, settings )
    .then( response => {
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
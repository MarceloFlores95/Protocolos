let section = document.querySelector('.results')
let routine = []
function allUsersFetchSection() {
    console.log("AllUsersFetchSection")
    
    let userID = document.getElementById("labelForIDUser").innerHTML

    let url = 'allusers/response';

    let settings = {
        method : 'GET'
    }

    // console.log(userID)
    
    fetch(url, settings)
        .then(response => {
            if(response.ok) {
                // console.log(response)
                return response.json();
            }
            throw new Error(response.statusText)
        })
        .then(responseJSON => {
            var content ="";
            for ( let i = 0; i < responseJSON.length; i ++ ){
                // section.innerHTML += `${responseJSON[i].name}`
                cont = 0
                if(responseJSON[i]._id != userID) {
                    routine.push(responseJSON[i])
                    content += `
                                <div>
                                <h2>${responseJSON[i].name}</h2>
                                </div>

                    `
                    content += `
                                <div class = "userR" id = "user${i}">
                                

                    `
                    for(let j = 0;j < responseJSON[i].routines.length;j++) { 
                        // console.log(responseJSON[i].routines[j])
                        if(responseJSON[i].routines[j].private == false) {
                            
                            if (responseJSON[i].routines[j].monday.muscle1 != "off") {
                                content += '<h4>Monday</h4>'
                                content += `<hr>
                                <p>${responseJSON[i].routines[j].monday.muscle1}</p>
                                <br><br>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].monday.exercise[0]}>
                                </iframe>
                                `
                            }

                            if (responseJSON[i].routines[j].monday.muscle2 != "off"){
                                content += `
                                <p>${responseJSON[i].routines[j].monday.muscle2}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].monday.exercise[1]}>
                                </iframe>
                                <hr>
                                `
                            }
                            if (responseJSON[i].routines[j].tuesday.muscle1 != "off") {
                                content += '<h4> Tuesday </h4>'
                                content += `<hr>
                                <p>${responseJSON[i].routines[j].tuesday.muscle1}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].tuesday.exercise[0]}>
                                </iframe>
                                `
                            }

                            if (responseJSON[i].routines[j].tuesday.muscle2 != "off"){
                                content += `
                                <p>${responseJSON[i].routines[j].tuesday.muscle2}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].tuesday.exercise[1]}>
                                </iframe>
                                <hr>
                                `
                            }
                            
                            if (responseJSON[i].routines[j].wednesday.muscle1 != "off") {
                                content += '<h4> Wednesday </h4>'
                                content += `<hr>
                                <p>${responseJSON[i].routines[j].wednesday.muscle1}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].wednesday.exercise[0]}>
                                </iframe>
                                ` 
                            }

                            if (responseJSON[i].routines[j].wednesday.muscle2 != "off"){
                                content += `
                                <p>${responseJSON[i].routines[j].wednesday.muscle2}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].wednesday.exercise[1]}>
                                </iframe>
                                <hr>
                                `  
                            }

                            
                            if (responseJSON[i].routines[j].thursday.muscle1 != "off") {
                                content += '<h4> Thursday </h4>'
                                content += `<hr>
                                <p>${responseJSON[i].routines[j].thursday.muscle1}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].thursday.exercise[0]}>
                                </iframe>
                                `
                            }

                            if (responseJSON[i].routines[j].thursday.muscle2 != "off"){
                                content+= `
                                <p>${responseJSON[i].routines[j].thursday.muscle2}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].thursday.exercise[1]}>
                                </iframe><hr>
                                <hr>
                                `
                            }
                            
                            if (responseJSON[i].routines[j].friday.muscle1 != "off") {
                                content += '<h4> Friday </h4>'
                                content += `<hr>
                                <p>${responseJSON[i].routines[j].friday.muscle1}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].friday.exercise[0]}>
                                </iframe>                                `
                            }

                            if (responseJSON[i].routines[j].friday.muscle2 != "off"){
                                content += `
                                <p>${responseJSON[i].routines[j].friday.muscle2}</p>
                                <iframe class = "box" width="280" height="210"
                                    src=${responseJSON[i].routines[j].friday.exercise[1]}>
                                </iframe>
                                <hr>
                                `
                            }
                            
                            // console.log(JSON.stringify(responseJSON[i].routines[j]))
                            content +=`
                                        </div>
                                        <button id= "addFavoriteRoutine" onclick="addFavorite('${responseJSON[i]._id}','${responseJSON[i].routines[j]._id}')"> Add to favorites </button>
                                        <br>
                                        <hr>
                                        <br>

                                        `
                        } else {
                            cont = cont + 1;
                            if (responseJSON[i].routines.length == cont) {
                                content +=`The user has 0 routines to share.`
                            }
                        }
                        section.innerHTML = content
                    }                   
                }
            }
        })
        .catch(err => {
            console.log("Error")
            console.log(err.message)
        })
    
}

function addFavorite(userID, routineID) {
    console.log("Add Favorites")
    // console.log(userID)
    // console.log(routineID)
    // console.log(routine)
    let newRoutine;
    for(let i = 0; i< routine.length; i++) {
        if (routine[i]._id == userID) {
            for (let j = 0; j< routine[i].routines.length; j++) {
                if(routine[i].routines[j]._id == routineID) {
                    newRoutine = routine[i].routines[j]
                }
            }
        }
    }
    let userActiveID = document.getElementById("labelForIDUser").innerHTML

    // console.log(newRoutine)

    let url = `allusers/userPushFavorite/${userActiveID}`;
        
    let settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newRoutine)
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
        console.log(responseJSON)
        document.getElementById("addFavoriteRoutine").disabled = true;
        })
        .catch( err => {
        console.log(err.message)
        });

}

function init() {
    // console.log("All users")
    allUsersFetchSection()
}

init()
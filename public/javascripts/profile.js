let section = document.querySelector('.results')

function saveNewInfo(id) {
    let modalForm = document.querySelector( '.modalUserInfo' );
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    
    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        // /userPatch/:id
        let url = `profile/userPatch/${id}`;
        
        let nameInput = document.getElementById('input-name').value
        let ageInput = document.getElementById('input-age').value
        let heightInput = document.getElementById('input-height').value
        let actualWeightInput = document.getElementById('input-actual-weight').value
        let initialWeightInput = document.getElementById('input-initial-weight').value
        
        let data = {
            name : nameInput,
            age : ageInput,
            height: heightInput,
            actual_weight: actualWeightInput,
            initial_weight: initialWeightInput
        }
        
        let settings = {
            method : 'PATCH',
            headers : data
        }
        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // console.log(responseJSON)
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                }
            }
            profileFetchSection(id)
            
        })
        .catch( err => {
            console.log(err.message)
        });
    },{once : true})

    
    
}

function editInfoUser() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalUserInfo");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function profileFetchSection(id){
    console.log("ProfileFetchSection")
    // section.innerHTML = `profile`

    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            section.innerHTML = `
            <div class="userInfo">
            <img src="../images/Profile1.jpg" width="200" alt="Avatar" height="150">
                <br><br>
                <div class="userInfoText">
                    <label for="">Name:${responseJSON.name}</label>
                    <br>
                    <label for="">Age:${responseJSON.age} </label>
                    <br>
                    <label for="">Height:${responseJSON.height} </label>
                    <br>
                    <label for="">Actual Weight:${responseJSON.actual_weight} </label>
                    <br>
                    <label for="">Inicial Weight:${responseJSON.initial_weight} </label>
                <div class="userInfoText">
                <div class="buttonInfo">
                    <button id="modalUserInfo" onclick="editInfoUser()" >Modify Information</button>
                    <button id="modalUserInfo" onclick="deleteInfoUser('${id}')" >Delete Account</button>
                </div>
            </div>
            `
        })
        .catch( err => {
            console.log(err.message)
        });
    
}

function deleteInfoUser(id) {
    console.log("DeleteUserSection")
    let url = `profile/deleteUser/${id}`;
    
    let settings = {
        method : 'GET',
    }

    fetch(url,settings)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .catch(err =>{
            console.log(err)
        })

    
}

function progressFetchSection(id) {
    console.log("ProgressFetchSection")
    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            if (responseJSON.goal != 0) {    
                progress = ((responseJSON.initial_weight-responseJSON.actual_weight) * 100) / (responseJSON.initial_weight - responseJSON.goal)
                section.innerHTML = `
                                    <div class = "userProgress"> 
                                    
                                    <h2>Current Weight:</h2>
                                    <h4>${responseJSON.actual_weight}</h4>
                                    <br><br>
                                    <br>                                    <h3>Your progress is:</h3>
                                    <h4>${progress} %</h4>
                                    <div id="myProgress">
                                        <div id="myProgressBar"></div>
                                    </div>
                                    </div>
                                    `
            } else {
                section.innerHTML = `
                                    <div class = "userProgress"> 
                                    
                                    <h1>Current Weight:</h1>
                                    <h4>${responseJSON.actual_weight}</h4>
                                    
                                    <h2>Your actual goal is 0, please change it.</h2>
                                    </div>
                                    `
            }
            move()
        })
        .catch( err => {
            console.log(err.message)
        });
                            
}

function goalFetchSection(id) {
    console.log("GoalFetchSection")
    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            section.innerHTML = `
            <div class = "userGoal">     
                <h2>Your goal is:</h2>
                <h1>${responseJSON.goal} </h1> 
                <img src="../images/goal.jpg" width="300" alt="Avatar" height="262">

            </div>
            <div class="buttonInfo">
                <button id="modalGoalInfo" onclick="editGoalUser()" >Modify Information</button>
            </div>
            `
        })
        .catch( err => {
            console.log(err.message)
        });

}

function editGoalUser() {
    // Get the modal
    var modal = document.getElementById("goalModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalUserGoal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function saveNewGoal(id) {
    let modalForm = document.querySelector( '.modalUserGoal' );
    var modal = document.getElementById("goalModal");
    modal.style.display = "none";
    
    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        // /userPatch/:id
        let url = `profile/userPatch/${id}`;
        
        let goalInput = document.getElementById('input-goal').value

        let data = {
            goal : goalInput
        }
        
        let settings = {
            method : 'PATCH',
            headers : data
        }
        
        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // console.log(responseJSON)
            // Get the modal
            var modal = document.getElementById("goalModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                }
            }
            goalFetchSection(id)
        })
        .catch( err => {
            console.log(err.message)
        });
    },{once : true})
    
}

function createNewRoutine(id) {
    console.log("CreateNewRoutine")
    // console.log(id)
    // Get the modal
    var modal = document.getElementById("createRoutineModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalCreateRoutine");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }

}

function myExercise(id, results) {
    var muscle = document.getElementById(id).value;
    // document.getElementById(results).innerHTML = "You selected: " + muscle;
    var videoSection = document.getElementById(results)
    // watch?v=
    // embed/
    console.log(id)
    console.log(id.search("First"))
    console.log(results)
    if (id.search("First") > -1) {
        var videoBicep ="https://www.youtube.com/embed/iGYeHsgb4CY"
        var videoTricep = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        var videoAbs = "https://www.youtube.com/embed/1919eTCoESo"
        var videoChest = "https://www.youtube.com/embed/89e518dl4I8"
        var videoBack ="https://www.youtube.com/embed/eE7dzM0iexc"
        var videoLegs = "https://www.youtube.com/embed/rOxlw2VMSDw"
    } else {
        var videoBicep = "https://www.youtube.com/embed/1FN6ovYpkoM"
        var videoTricep = "https://www.youtube.com/embed/SuajkDYlIRw"
        var videoAbs = "https://www.youtube.com/embed/krlBcLYtDbk"
        var videoChest = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        var videoBack = "https://www.youtube.com/embed/NoRkALo4AMQ"
        var videoLegs = "https://www.youtube.com/embed/RjexvOAsVtI"
    }

    if (muscle == "Bicep") {
        videoSection.innerHTML = "You selected: " +  muscle + "\n";
        videoSection.innerHTML += ` <br>
        <iframe width="140" height="105"
            src=${videoBicep}>
        </iframe>
        `
    }
    if (muscle == "Tricep") {
        videoSection.innerHTML = "You selected: " +  muscle + "\n";
        videoSection.innerHTML += ` <br>
        <iframe width="140" height="105"
            src=${videoTricep}>
        </iframe>
        `
    }
    if (muscle == "Abs") {
        videoSection.innerHTML = "You selected: " +  muscle + "\n";
        videoSection.innerHTML += ` <br>
        <iframe width="140" height="105"
            src=${videoAbs}>
        </iframe>
        `
    }
    if (muscle == "Chest") {
        videoSection.innerHTML = "You selected: " +  muscle + "\n";
        videoSection.innerHTML += ` <br>
        <iframe width="140" height="105"
            src=${videoChest}>
        </iframe>
        `
    }
    if (muscle == "Back") {
        videoSection.innerHTML = "You selected: " +  muscle + "\n";
        videoSection.innerHTML += ` <br>
        <iframe width="140" height="105"
            src=${videoBack}>
        </iframe>
        `
    }
    if (muscle == "Legs") {
        videoSection.innerHTML = "You selected: " +  muscle + "\n";
        videoSection.innerHTML += ` <br>
        <iframe width="140" height="105"
            src=${videoLegs}>
        </iframe>
        `
    }
    if (muscle == "off") {
        videoSection.innerHTML = "";
    }
}


function saveNewRoutine(id) {
    console.log("Save New Routine")

    let modalForm = document.querySelector( '.modalCreateRoutine' );
    var modal = document.getElementById("createRoutineModal");
    modal.style.display = "none";

    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let firstMuscleMonday = document.getElementById("First_Muscle_Monday")
        firstMuscleMonday = firstMuscleMonday.options[firstMuscleMonday.selectedIndex].value;
        let secondMuscleMonday = document.getElementById("Second_Muscle_Monday")
        secondMuscleMonday = secondMuscleMonday.options[secondMuscleMonday.selectedIndex].value;

        let firstMuscleTuesday = document.getElementById("First_Muscle_Tuesday")
        firstMuscleTuesday = firstMuscleTuesday.options[firstMuscleTuesday.selectedIndex].value;
        let secondMuscleTuesday = document.getElementById("Second_Muscle_Tuesday")
        secondMuscleTuesday = secondMuscleTuesday.options[secondMuscleTuesday.selectedIndex].value;
        
        let firstMuscleWednesday = document.getElementById("First_Muscle_Wednesday")
        firstMuscleWednesday = firstMuscleWednesday.options[firstMuscleWednesday.selectedIndex].value;
        let secondMuscleWednesday = document.getElementById("Second_Muscle_Wednesday")
        secondMuscleWednesday = secondMuscleWednesday.options[secondMuscleWednesday.selectedIndex].value;
        
        let firstMuscleThursday = document.getElementById("First_Muscle_Thursday")
        firstMuscleThursday = firstMuscleThursday.options[firstMuscleThursday.selectedIndex].value;
        let secondMuscleThursday = document.getElementById("Second_Muscle_Thursday")
        secondMuscleThursday = secondMuscleThursday.options[secondMuscleThursday.selectedIndex].value;
        
        let firstMuscleFriday = document.getElementById("First_Muscle_Friday")
        firstMuscleFriday = firstMuscleFriday.options[firstMuscleFriday.selectedIndex].value;
        let secondMuscleFriday = document.getElementById("Second_Muscle_Friday")
        secondMuscleFriday = secondMuscleFriday.options[secondMuscleFriday.selectedIndex].value;
        
        let privateRoutine = document.getElementById("privateRoutine")
        privateRoutine = privateRoutine.options[privateRoutine.selectedIndex].value;

        if (privateRoutine == "true") {
            privateRoutine = true
        } else {
            privateRoutine = false
        }
        // Bicep
        if (firstMuscleMonday == "Bicep" ) {
            var videoMonday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }   

        if(firstMuscleTuesday == "Bicep" ) {
            var videoTuesday ="https://www.youtube.com/embed/iGYeHsgb4CY"  
        }

        if (firstMuscleWednesday == "Bicep") {
            var videoWednesday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        if(firstMuscleThursday == "Bicep") {
            var videoThursday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        if(firstMuscleFriday == "Bicep") {
            var videoFriday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        // Tricep
        if (firstMuscleMonday == "Tricep") {
            var videoMonday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }

        if (firstMuscleTuesday == "Tricep") {
            var videoTuesday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        if (firstMuscleWednesday == "Tricep") {
            var videoWednesday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        if (firstMuscleThursday == "Tricep") {
            var videoThursday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        if (firstMuscleFriday == "Tricep") {
            var videoFriday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        // ABS
        if (firstMuscleMonday == "Abs") {
            var videoMonday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleTuesday == "Abs") {
            var videoTuesday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleWednesday == "Abs") {
            var videoWednesday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleThursday == "Abs") {
            var videoThursday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleFriday == "Abs") {
            var videoFriday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        // Chest
        if (firstMuscleMonday == "Chest") {
            var videoMonday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleTuesday == "Chest") {
            var videoTuesday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleWednesday == "Chest") {
            var videoWednesday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleThursday == "Chest") {
            var videoThursday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleFriday == "Chest") {
            var videoFriday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        // Back
        if (firstMuscleMonday == "Back") {
            var videoMonday ="https://www.youtube.com/embed/eE7dzM0iexc" 
        }
        if (firstMuscleTuesday == "Back") {
            var videoTuesday ="https://www.youtube.com/embed/eE7dzM0iexc" 
        }
        if (firstMuscleWednesday == "Back" ) {
            var videoWednesday ="https://www.youtube.com/embed/eE7dzM0iexc"
        }
        if (firstMuscleThursday == "Back") {
            var videoThursday ="https://www.youtube.com/embed/eE7dzM0iexc"
        }
        if (firstMuscleFriday == "Back") {
            var videoFriday ="https://www.youtube.com/embed/eE7dzM0iexc"
        }
        // Legs
        if (firstMuscleMonday == "Legs") {
            var videoMonday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleTuesday == "Legs") {
            var videoTuesday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleWednesday == "Legs") {
            var videoWednesday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleThursday == "Legs") {
            var videoThursday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleFriday == "Legs") {
            var videoFriday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        // Off
        if (firstMuscleMonday == "off") {
            var videoMonday = "null"
        }
        if (firstMuscleTuesday == "off") {
            var videoTuesday = "null"
        }
        if (firstMuscleWednesday == "off") {
            var videoWednesday = "null"
        }
        if (firstMuscleThursday == "off") {
            var videoThursday = "null"
        }
        if (firstMuscleFriday == "off") {
            var videoFriday = "null"
        }
        // Bicep 2
        if (secondMuscleMonday == "Bicep") {
            var videoMonday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleTuesday == "Bicep") {
            var videoTuesday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleWednesday == "Bicep") {
            var videoWednesday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleThursday == "Bicep") {
            var videoThursday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleFriday == "Bicep") {
            var videoFriday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        
        // Tricep
        if (secondMuscleMonday == "Tricep") {
            var videoMonday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleTuesday == "Tricep") {
            var videoTuesday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleWednesday == "Tricep") {
            var videoWednesday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleThursday == "Tricep") {
            var videoThursday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleFriday == "Tricep") {
            var videoFriday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        // Abs
        if (secondMuscleMonday == "Abs") {
            var videoMonday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleTuesday == "Abs") {
            var videoTuesday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleWednesday == "Abs") {
            var videoWednesday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleThursday == "Abs") {
            var videoThursday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleFriday == "Abs") {
            var videoFriday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }

        // Chest
        if (secondMuscleMonday == "Chest") {
            var videoMonday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleTuesday == "Chest") {
            var videoTuesday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleWednesday == "Chest") {
            var videoWednesday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleThursday == "Chest") {
            var videoThursday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleFriday == "Chest") {
            var videoFriday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        
        // Back
        if (secondMuscleMonday == "Back") {
            var videoMonday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }
        if (secondMuscleTuesday == "Back") {
            var videoTuesday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }
        if (secondMuscleWednesday == "Back") {
            var videoWednesday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }
        if (secondMuscleThursday == "Back") {
            var videoThursday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"            
        }
        if (secondMuscleFriday == "Back") {
            var videoFriday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }

        // Legs
        if (secondMuscleMonday == "Legs") {
            var videoMonday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleTuesday == "Legs") {
            var videoTuesday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleWednesday == "Legs") {
            var videoWednesday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleThursday == "Legs") {
            var videoThursday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleFriday == "Legs") {
            var videoFriday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        
        // off
        if (secondMuscleMonday == "off") {
            var videoMonday2 = "null"
        }
        if (secondMuscleTuesday == "off") {
            var videoTuesday2 = "null"
        }
        if (secondMuscleWednesday == "off") {
            var videoWednesday2 = "null"
        }
        if (secondMuscleThursday == "off") {
            var videoThursday2 = "null"
        }
        if (secondMuscleFriday == "off") {
            var videoFriday2 = "null"
        }

        // Data
        let data = { 
            routines:{ 
                monday:{
                    muscle1: firstMuscleMonday,
                    muscle2: secondMuscleMonday,
                    exercise: [videoMonday,videoMonday2]
                },
                tuesday:{
                    muscle1: firstMuscleTuesday,
                    muscle2: secondMuscleTuesday,
                    exercise: [videoTuesday,videoTuesday2]
                },
                wednesday:{
                    muscle1: firstMuscleWednesday,
                    muscle2: secondMuscleWednesday,
                    exercise: [videoWednesday,videoWednesday2]
                },
                thursday:{
                    muscle1: firstMuscleThursday,
                    muscle2: secondMuscleThursday,
                    exercise: [videoThursday,videoThursday2]
                },
                friday:{
                    muscle1: firstMuscleFriday,
                    muscle2: secondMuscleFriday,
                    exercise: [videoFriday,videoFriday2]
                },
                private: privateRoutine
            }
        }
        // console.log(data)
        let url = `profile/userPushRoutine/${id}`;
        
        let settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }
        console.log(settings)
        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // console.log(responseJSON)
            // Get the modal
            console.log(responseJSON)
            
            var modal = document.getElementById("goalModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                }
            }
            routinesFetchSection(id)
        })
        .catch( err => {
            console.log(err.message)
        });

    }, {once : true})
}

function routinesFetchSection(id) {
    console.log("Routines Fetch Section")
    var content;
    content = `
        <div class= 'routineClass'>
            <button id = 'createRoutine' onclick="createNewRoutine('${id}')"> Create new routine</button> <br><br>
    `
    // console.log(id)
    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            if (responseJSON.routines.length > 0) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    content +=`<label hidden for="" id ="labelForIDFromRoutine${i}">${responseJSON.routines[i]._id}</label>`
                    content += ` 
                                <div class= 'eachRoutineClass'>
                                    <div class = "daysofexercise"> 
                                        <section>
                                            <h3>Monday:</h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].monday.muscle1} and ${responseJSON.routines[i].monday.muscle2}</h4>
                                             `
                    if(responseJSON.routines[i].monday.exercise[0] != "null") {
                        content += ` 
                        <h4>Recommended videos:</h4> 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].monday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.routines[i].monday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].monday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content += `                     
                                        </section>
                                        <section>
                                            <h3>Tuesday:</h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].tuesday.muscle1} and ${responseJSON.routines[i].tuesday.muscle2}</h4>
                                            
                                        `
                    if(responseJSON.routines[i].tuesday.exercise[0] != "null") {
                        content += ` <h4>Recommended videos:</h4> 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].tuesday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.routines[i].tuesday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].tuesday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content += ` 
                                        </section>
                                        <section>
                                            <h3>Wednesday:</h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].wednesday.muscle1} and ${responseJSON.routines[i].wednesday.muscle2}</h4>
                                            
                                            `
                    if(responseJSON.routines[i].wednesday.exercise[0] != "null") {
                        content += ` 
                        <h4>Recommended videos:</h4> 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].wednesday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.routines[i].wednesday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].wednesday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content+= `                       
                                        </section>
                                        <section>
                                            <h3>Thursday:</h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].thursday.muscle1} and ${responseJSON.routines[i].thursday.muscle2}</h4>
                                            
                                            `
                    if(responseJSON.routines[i].thursday.exercise[0] != "null") {
                        content += ` 
                        <h4>Recommended videos:</h4> 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].thursday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.routines[i].thursday.exercise[1] != "null") {
                        content+= ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].thursday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content += `         
                                        </section>
                                        <section>
                                            <h3>Friday:</h3>
                                            <h4>Muscles to train: ${responseJSON.routines[i].friday.muscle1} and ${responseJSON.routines[i].friday.muscle2}</h4>
                                            
                                            `
                    if(responseJSON.routines[i].friday.exercise[0] != "null") {
                        content += ` 
                        <h4>Recommended videos:</h4> 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].friday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.routines[i].friday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.routines[i].friday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content += `                          
                                        </section>
                                        <p>This routine is 
                                        `
                    if(responseJSON.routines[i].private == true) {
                        content += `private </p>`
                    } else {
                        content += `public </p>`
                    }
                    content += `                  
                                    </div>
                                    <button id = "modifyRoutine" onclick=modifyRoutine(${JSON.stringify(responseJSON.routines[i])},${i})>Modify routine</button>
                                    <button id = "eraseRoutine" onclick=eraseRoutine(${JSON.stringify(responseJSON._id)},${i},returnPositionRoutine(${i}))>Erase routine</button>
                                </div> 
                    `
                }
                
            } else {
                content += `
                <p>You dont have routines, please add one.<p>
                `
            }
            content +=`</div> `
            section.innerHTML = content;
        })
        .catch( err => {
            console.log(err.message)
        });
}

function eraseRoutine(id,position,idRoutine) {
    console.log("Erase Routine")
    
    let url = `profile/userDeleteRoutine/${id}`;
    let settings = {
        method: 'DELETE',
        headers: {
            position: position,
            idRoutine: idRoutine
        }
    }
    fetch(url, settings)
        .then(response => {
            //routinesFetchSection(id)
            return response.json();
            
        })
        .then(resultJSON => {
            routinesFetchSection(id)
            console.log(resultJSON)
        })
        .catch(err => {
            console.log(err)
        })

}

function modifyRoutine(routine,positionRoutine) {
    console.log("PositionNewRoutine")
    // console.log(id)
    // Get the modal
    var modal = document.getElementById("modifyRoutineModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalModifyRoutine");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    }
    // console.log(routine)
    // console.log(positionRoutine)
    var labelRt = document.querySelector("#labelForIDRoutine").innerHTML = JSON.stringify(positionRoutine)
    // console.log(labelRt)
}

function saveModifyRoutine(positionRoutine, id) {
    console.log("Save Modify Routine")
    routine = JSON.parse(positionRoutine)
    // console.log(routine)
    // console.log(routine._id)
    // console.log(id)
    let modalForm = document.querySelector( '.modalModifyRoutine' );
    var modal = document.getElementById("modifyRoutineModal");

    modal.style.display = "none";

    modalForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        let firstMuscleMonday = document.getElementById("First_Muscle_MondayNew")
        firstMuscleMonday = firstMuscleMonday.options[firstMuscleMonday.selectedIndex].value;
        let secondMuscleMonday = document.getElementById("Second_Muscle_MondayNew")
        secondMuscleMonday = secondMuscleMonday.options[secondMuscleMonday.selectedIndex].value;
        
        let firstMuscleTuesday = document.getElementById("First_Muscle_TuesdayNew")
        firstMuscleTuesday = firstMuscleTuesday.options[firstMuscleTuesday.selectedIndex].value;
        let secondMuscleTuesday = document.getElementById("Second_Muscle_TuesdayNew")
        secondMuscleTuesday = secondMuscleTuesday.options[secondMuscleTuesday.selectedIndex].value;
        
        let firstMuscleWednesday = document.getElementById("First_Muscle_WednesdayNew")
        firstMuscleWednesday = firstMuscleWednesday.options[firstMuscleWednesday.selectedIndex].value;
        let secondMuscleWednesday = document.getElementById("Second_Muscle_WednesdayNew")
        secondMuscleWednesday = secondMuscleWednesday.options[secondMuscleWednesday.selectedIndex].value;
        
        let firstMuscleThursday = document.getElementById("First_Muscle_ThursdayNew")
        firstMuscleThursday = firstMuscleThursday.options[firstMuscleThursday.selectedIndex].value;
        let secondMuscleThursday = document.getElementById("Second_Muscle_ThursdayNew")
        secondMuscleThursday = secondMuscleThursday.options[secondMuscleThursday.selectedIndex].value;
        
        let firstMuscleFriday = document.getElementById("First_Muscle_FridayNew")
        firstMuscleFriday = firstMuscleFriday.options[firstMuscleFriday.selectedIndex].value;
        let secondMuscleFriday = document.getElementById("Second_Muscle_FridayNew")
        secondMuscleFriday = secondMuscleFriday.options[secondMuscleFriday.selectedIndex].value;
        
        let privateRoutine = document.getElementById("privateRoutineNew")
        privateRoutine = privateRoutine.options[privateRoutine.selectedIndex].value;

        if (privateRoutine != "true") {
            privateRoutine = false
        } else {
            privateRoutine = true
        }

        // Bicep
        if (firstMuscleMonday == "Bicep" ) {
            var videoMonday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        if(firstMuscleTuesday == "Bicep" ) {
            var videoTuesday ="https://www.youtube.com/embed/iGYeHsgb4CY"  
        }

        if (firstMuscleWednesday == "Bicep") {
            var videoWednesday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        if(firstMuscleThursday == "Bicep") {
            var videoThursday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        if(firstMuscleFriday == "Bicep") {
            var videoFriday ="https://www.youtube.com/embed/iGYeHsgb4CY"
        }

        // Tricep
        if (firstMuscleMonday == "Tricep") {
            var videoMonday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }

        if (firstMuscleTuesday == "Tricep") {
            var videoTuesday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        if (firstMuscleWednesday == "Tricep") {
            var videoWednesday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        if (firstMuscleThursday == "Tricep") {
            var videoThursday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        if (firstMuscleFriday == "Tricep") {
            var videoFriday = "https://www.youtube.com/embed/Sa2GcjDnkm4"
        }
        // ABS
        if (firstMuscleMonday == "Abs") {
            var videoMonday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleTuesday == "Abs") {
            var videoTuesday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleWednesday == "Abs") {
            var videoWednesday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleThursday == "Abs") {
            var videoThursday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        if (firstMuscleFriday == "Abs") {
            var videoFriday = "https://www.youtube.com/embed/1919eTCoESo"
        }
        // Chest
        if (firstMuscleMonday == "Chest") {
            var videoMonday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleTuesday == "Chest") {
            var videoTuesday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleWednesday == "Chest") {
            var videoWednesday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleThursday == "Chest") {
            var videoThursday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        if (firstMuscleFriday == "Chest") {
            var videoFriday = "https://www.youtube.com/embed/89e518dl4I8"
        }
        // Back
        if (firstMuscleMonday == "Back") {
            var videoMonday ="https://www.youtube.com/embed/eE7dzM0iexc" 
        }
        if (firstMuscleTuesday == "Back") {
            var videoTuesday ="https://www.youtube.com/embed/eE7dzM0iexc" 
        }
        if (firstMuscleWednesday == "Back" ) {
            var videoWednesday ="https://www.youtube.com/embed/eE7dzM0iexc"
        }
        if (firstMuscleThursday == "Back") {
            var videoThursday ="https://www.youtube.com/embed/eE7dzM0iexc"
        }
        if (firstMuscleFriday == "Back") {
            var videoFriday ="https://www.youtube.com/embed/eE7dzM0iexc"
        }
        // Legs
        if (firstMuscleMonday == "Legs") {
            var videoMonday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleTuesday == "Legs") {
            var videoTuesday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleWednesday == "Legs") {
            var videoWednesday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleThursday == "Legs") {
            var videoThursday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        if (firstMuscleFriday == "Legs") {
            var videoFriday = "https://www.youtube.com/embed/rOxlw2VMSDw"
        }
        // Off
        if (firstMuscleMonday == "off") {
            var videoMonday = "null"
        }
        if (firstMuscleTuesday == "off") {
            var videoTuesday = "null"
        }
        if (firstMuscleWednesday == "off") {
            var videoWednesday = "null"
        }
        if (firstMuscleThursday == "off") {
            var videoThursday = "null"
        }
        if (firstMuscleFriday == "off") {
            var videoFriday = "null"
        }
        // Bicep 2
        if (secondMuscleMonday == "Bicep") {
            var videoMonday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleTuesday == "Bicep") {
            var videoTuesday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleWednesday == "Bicep") {
            var videoWednesday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleThursday == "Bicep") {
            var videoThursday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        if (secondMuscleFriday == "Bicep") {
            var videoFriday2 ="https://www.youtube.com/embed/1FN6ovYpkoM"
        }
        
        // Tricep
        if (secondMuscleMonday == "Tricep") {
            var videoMonday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleTuesday == "Tricep") {
            var videoTuesday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleWednesday == "Tricep") {
            var videoWednesday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleThursday == "Tricep") {
            var videoThursday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }
        if (secondMuscleFriday == "Tricep") {
            var videoFriday2 = "https://www.youtube.com/embed/SuajkDYlIRw"
        }

        // Abs
        if (secondMuscleMonday == "Abs") {
            var videoMonday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleTuesday == "Abs") {
            var videoTuesday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleWednesday == "Abs") {
            var videoWednesday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleThursday == "Abs") {
            var videoThursday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }
        if (secondMuscleFriday == "Abs") {
            var videoFriday2 = "https://www.youtube.com/embed/krlBcLYtDbk"
        }

        // Chest
        if (secondMuscleMonday == "Chest") {
            var videoMonday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleTuesday == "Chest") {
            var videoTuesday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleWednesday == "Chest") {
            var videoWednesday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleThursday == "Chest") {
            var videoThursday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }
        if (secondMuscleFriday == "Chest") {
            var videoFriday2 = "https://www.youtube.com/embed/pJlE3CHP-Ac"
        }

        // Back
        if (secondMuscleMonday == "Back") {
            var videoMonday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }
        if (secondMuscleTuesday == "Back") {
            var videoTuesday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }
        if (secondMuscleWednesday == "Back") {
            var videoWednesday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }
        if (secondMuscleThursday == "Back") {
            var videoThursday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"            
        }
        if (secondMuscleFriday == "Back") {
            var videoFriday2 ="https://www.youtube.com/embed/NoRkALo4AMQ"
        }

        // Legs
        if (secondMuscleMonday == "Legs") {
            var videoMonday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleTuesday == "Legs") {
            var videoTuesday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleWednesday == "Legs") {
            var videoWednesday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleThursday == "Legs") {
            var videoThursday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }
        if (secondMuscleFriday == "Legs") {
            var videoFriday2 = "https://www.youtube.com/embed/RjexvOAsVtI"
        }

        // off
        if (secondMuscleMonday == "off") {
            var videoMonday2 = "null"
        }
        if (secondMuscleTuesday == "off") {
            var videoTuesday2 = "null"
        }
        if (secondMuscleWednesday == "off") {
            var videoWednesday2 = "null"
        }
        if (secondMuscleThursday == "off") {
            var videoThursday2 = "null"
        }
        if (secondMuscleFriday == "off") {
            var videoFriday2 = "null"
        }

    // Data
    let data = { 
        routines:{ 
            monday:{
                muscle1: firstMuscleMonday,
                muscle2: secondMuscleMonday,
                exercise: [videoMonday,videoMonday2]
            },
            tuesday:{
                muscle1: firstMuscleTuesday,
                muscle2: secondMuscleTuesday,
                exercise: [videoTuesday,videoTuesday2]
            },
            wednesday:{
                muscle1: firstMuscleWednesday,
                muscle2: secondMuscleWednesday,
                exercise: [videoWednesday,videoWednesday2]
            },
            thursday:{
                muscle1: firstMuscleThursday,
                muscle2: secondMuscleThursday,
                exercise: [videoThursday,videoThursday2]
            },
            friday:{
                muscle1: firstMuscleFriday,
                muscle2: secondMuscleFriday,
                exercise: [videoFriday,videoFriday2]
            },
            private: privateRoutine
        }
    }


        let Arr = [routine,data]
        let url = `profile/userModifyRoutine/${id}`;
        
        let settings = {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(Arr)
        }
        
        fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // console.log(responseJSON)
            // Get the modal
            console.log(responseJSON)
            
            var modal = document.getElementById("labelForIDRoutine");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                }
            }
            routinesFetchSection(id)
        })
        .catch( err => {
            console.log(err.message)
        });

    }, {once : true})
}

function returnIDRoutine() {
    console.log('returnIDRoutine')
    var labelRt = document.querySelector("#labelForIDRoutine").innerHTML
    console.log(labelRt)
    return labelRt
}

function returnPositionRoutine(i) {
    console.log('returnPositionRoutine')
    var labelRt = document.querySelector(`#labelForIDFromRoutine${i}`).innerHTML
    console.log(labelRt)
    return labelRt
}


function exerciseFetchSection(id) {
    console.log(id)
    let actualDate = new Date();
    let day = actualDate.getDay();
    // let day = 1
    // section.innerHTML = `${day}`
    console.log(day)
    // Sunday
    if(day == 0) {
        section.innerHTML = "Today is Sunday, relax!"
    }
    // Saturday
    if(day == 6) {
        section.innerHTML = "Today is Saturday, relax!"
    }

    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            // Monday
            var content;
            console.log(responseJSON)
            if(day == 1) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    if(responseJSON.routines[i].monday.muscle1 == "off" && responseJSON.routines[i].monday.muscle2 == "off" ) {
                        content = "You have a break day!"
                    } else {
                        content = `
                            <div class="day">
                                <p>Today is Monday, you choose this muscles to train </p>
                                `
                                if(responseJSON.routines[i].monday.muscle1 != "off") {
                                    content +=
                                    `
                                    <label for="">Name:${responseJSON.routines[i].monday.muscle1}</label>
                                    <br>
                                    <iframe width="280" height="210"
                                        src=${responseJSON.routines[i].monday.exercise[0]}>
                                    </iframe>
                                    <br>`
                                }
                                if(responseJSON.routines[i].monday.muscle2 != "off") {
                                    content +=` 
                                        <label for="">Name:${responseJSON.routines[i].monday.muscle2}</label>
                                        <br>
                                        <iframe width="280" height="210"
                                            src=${responseJSON.routines[i].monday.exercise[1]}>
                                        </iframe>
                                    </div>`
                                    
                            }
                            content +=` 
                            <div class="buttonInfo">
                                        <button id="modalUserInfo" onclick="editExercise()" >Modify Exercise</button>
                                    </div>   
                            `
                    }  
                }
            }
            // Tuesday
            if(day == 2) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    if(responseJSON.routines[i].tuesday.muscle1 == "off" && responseJSON.routines[i].tuesday.muscle2 == "off") {
                        content = "You have a break day!"
                    } else {
                        content = `
                        <div class="day">
                            <p>Today is Tuesday, you choose this muscles to train </p>
                            <label for="">Name:${responseJSON.routines[i].tuesday.muscle1}</label>
                            <br>
                            <iframe width="280" height="210"
                                src=${responseJSON.routines[i].tuesday.exercise[0]}>
                            </iframe>
                            <br>
                            <label for="">Name:${responseJSON.routines[i].tuesday.muscle2}</label>
                            <br>
                            <iframe width="280" height="210"
                                src=${responseJSON.routines[i].tuesday.exercise[1]}>
                            </iframe>
                        </div>
                        <div class="buttonInfo">
                            <button id="modalUserInfo" onclick="editExercise()" >Modify Exercise</button>
                        </div>
                        `
                    }
                }
            }
            // Wednesday
            if(day == 3) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    if(responseJSON.routines[i].wednesday.muscle1 == "off" && responseJSON.routines[i].wednesday.muscle2 == "off") {
                        content = "You have a break day!"
                    } else {
                        content= `
                        <div class="day">
                            <p>Today is Wednesday, you choose this muscles to train </p>
                            <label for="">Name:${responseJSON.routines[i].wednesday.muscle1}</label>
                            <br>
                            <iframe width="280" height="210"
                                src=${responseJSON.routines[i].wednesday.exercise[0]}>
                            </iframe>
                            <br>
                            <label for="">Name:${responseJSON.routines[i].wednesday.muscle2}</label>
                            <br>
                            <iframe width="280" height="210"
                                src=${responseJSON.routines[i].wednesday.exercise[1]}>
                            </iframe>
                        </div>
                        <div class="buttonInfo">
                            <button id="modalUserInfo" onclick="editExercise()" >Modify Exercise</button>
                        </div>
                        `
                    }  
                }
            }
            // Thursday
            if(day == 4) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    if(responseJSON.routines[i].thursday.muscle1 == "off" && responseJSON.routines[i].thursday.muscle2 == "off") {
                        content = "You have a break day!"
                    } else {
                        content= `
                        <div class="day">
                            <p>Today is Thursday, you choose this muscles to train </p>
                            <label for="">Name:${responseJSON.routines[i].thursday.muscle1}</label>
                            <br>
                            <iframe width="280" height="210"
                                src=${responseJSON.routines[i].thursday.exercise[0]}>
                            </iframe>
                            <br>
                            <label for="">Name:${responseJSON.routines[i].thursday.muscle2}</label>
                            <br>
                            <iframe width="280" height="210"
                                src=${responseJSON.routines[i].thursday.exercise[1]}>
                            </iframe>
                        </div>
                        <div class="buttonInfo">
                            <button id="modalUserInfo" onclick="editExercise()" >Modify Exercise</button>
                        </div>
                        `
                    }
                   
                }
            }
            // Friday
            if(day == 5) {
                for ( let i = 0; i < responseJSON.routines.length; i ++ ){
                    if(responseJSON.routines[i].friday.muscle1 == "off" && responseJSON.routines[i].friday.muscle2 == "off" ) {
                        content = "You have a break day!"
                    } else {
                        content= `
                            <div class="day">
                                <p>Today is Friday, you choose this muscles to train </p>
                                `
                                if(responseJSON.routines[i].friday.muscle1 != "off") {
                                    content+=
                                    `
                                    <label for="">Name:${responseJSON.routines[i].friday.muscle1}</label>
                                    <br>
                                    <iframe width="280" height="210"
                                        src=${responseJSON.routines[i].friday.exercise[0]}>
                                    </iframe>
                                    <br>`
                                }
                                if(responseJSON.routines[i].friday.muscle2 != "off") {
                                        content +=` 
                                        <label for="">Name:${responseJSON.routines[i].friday.muscle2}</label>
                                        <br>
                                        <iframe width="280" height="210"
                                            src=${responseJSON.routines[i].friday.exercise[1]}>
                                        </iframe>
                                    </div>`
                                    
                            }
                            content +=` 
                            <div class="buttonInfo">
                                    </div>   
                            `
                    } 
                }
            }
            section.innerHTML = content
        })
        .catch( err => {
            console.log(err.message)
        });
}

function favoritesFetchSection(id) {
    console.log("Favorites Fetch Section")
    var content;
    content = `
        <div class= 'favoriteClass'>
    `
    // console.log(id)
    let url = `profile/userInfo/${id}`;
    
    let settings = {
        method : 'GET',
    }
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                section.innerHTML =""
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            if (responseJSON.favorites.length > 0) {
                for ( let i = 0; i < responseJSON.favorites.length; i ++ ){
                    
                    section.innerHTML +=`<label hidden for="" id ="labelForIDFromRoutineF${i}">${responseJSON.favorites[i]._id}</label>
                    <label hidden for="" id ="labelForUserID">${responseJSON._id}</label>
                                        `
                                        
                    content += ` 
                                <div class= 'eachRoutineClass'>
                                    <div class = "daysofexercise"> 
                                        <section>
                                            <h3>Monday:<h3>
                                            <h4>Muscles to train: ${responseJSON.favorites[i].monday.muscle1} and ${responseJSON.favorites[i].monday.muscle2}</h4>
                                            <h4>Recommended videos:<h4>  `
                    if(responseJSON.favorites[i].monday.exercise[0] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].monday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.favorites[i].monday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].monday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content+= `                     
                                        </section>
                                        <section>
                                            <h3>Tuesday:<h3>
                                            <h4>Muscles to train: ${responseJSON.favorites[i].tuesday.muscle1} and ${responseJSON.favorites[i].tuesday.muscle2}</h4>
                                            <h4>Recommended videos:<h4> 
                                        `
                    if(responseJSON.favorites[i].tuesday.exercise[0] != "null") {
                        content+= ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].tuesday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.favorites[i].tuesday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].tuesday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content += ` 
                                        </section>
                                        <section>
                                            <h3>Wednesday:<h3>
                                            <h4>Muscles to train: ${responseJSON.favorites[i].wednesday.muscle1} and ${responseJSON.favorites[i].wednesday.muscle2}</h4>
                                            <h4>Recommended videos:<h4>
                                            `
                    if(responseJSON.favorites[i].wednesday.exercise[0] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].wednesday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.favorites[i].wednesday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].wednesday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content += `                       
                                        </section>
                                        <section>
                                            <h3>Thursday:<h3>
                                            <h4>Muscles to train: ${responseJSON.favorites[i].thursday.muscle1} and ${responseJSON.favorites[i].thursday.muscle2}</h4>
                                            <h4>Recommended videos:<h4>
                                            `
                    if(responseJSON.favorites[i].thursday.exercise[0] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].thursday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.favorites[i].thursday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].thursday.exercise[1]}>
                                            </iframe>
                                            `
                    }
                    content+= `         
                                        </section>
                                        <section>
                                            <h3>Friday:<h3>
                                            <h4>Muscles to train: ${responseJSON.favorites[i].friday.muscle1} and ${responseJSON.favorites[i].friday.muscle2}</h4>
                                            <h4>Recommended videos:<h4>
                                            `
                    if(responseJSON.favorites[i].friday.exercise[0] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].friday.exercise[0]}>
                                            </iframe>
                                            `
                    }
                    if(responseJSON.favorites[i].friday.exercise[1] != "null") {
                        content += ` 
                                            <iframe width="280" height="210"
                                                src=${responseJSON.favorites[i].friday.exercise[1]}>
                                            </iframe>
                                            `
                    }
        
                    content += `                  
                                    </div>
                                    <button class = "eraseFavoriteRoutine" onclick=eraseFavorite('${i}')>Erase routine</button>
                                </div> 
                    `
                }
            } else {
                content += `
                <p>You dont have favorites, please add one.<p>
                `
            }
            section.innerHTML += content
        })
        .catch( err => {
            console.log(err.message)
        });

    
    section.innerHTML +=`</div> `
}


function eraseFavorite(positionForFavoriteID) {
    // console.log(positionForFavoriteID)
    let userID = document.getElementById('labelForUserID').innerHTML
    let userFavoriteID = document.getElementById(`labelForIDFromRoutineF${positionForFavoriteID}`).innerHTML
    console.log(userID)
    console.log(userFavoriteID)

    let url = `profile/userDeleteFavorite/${userID}`;
    let settings = {
        method: 'DELETE',
        headers: {
            position: positionForFavoriteID,
            idRoutine: userFavoriteID
        }
    }
    fetch(url, settings)
        .then(response => {
            //routinesFetchSection(id)
            // exerciseFetchSection(userID)
            return response.json();
            
        })
        .then(resultJSON => {
            favoritesFetchSection(userID)
            console.log(resultJSON)
        })
        .catch(err => {
            console.log(err)
        })
}

function userLogOut() {
    console.log("User Logout")

    let url = `profile/logout`;
    
    let settings = {
        method : 'GET',
    }

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                location.reload()
                return response;
            }
            throw new Error( response.statusText );
        })
        .catch( err => {
            console.log(err.message)
        });
    
}


function init(){
    // watchUserProfile();
    // watchAddStudentForm();
    // move()
}


var progress = 0
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myProgressBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= progress) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}


// init();
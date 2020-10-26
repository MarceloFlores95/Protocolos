const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    },
    actual_weight: {
        type: Number
    },
    initial_weight: {
        type: Number
    },
    goal: {
        type: Number
    },
    routines: [{
        monday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        tuesday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        wednesday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        thursday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        friday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        saturday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        sunday: {
            muscle1: {
                type: String
            },
            muscle2: {
                type: String
            },
            exercise: [{
                type: String
            }]
        },
        private: {
            type: Boolean
        }
    }],
    favorites: [] 

});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5), null)
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
};

const userCollection = mongoose.model('users', userSchema);

const Users = {
   createUser : function(newUser) {
       return userCollection // db.students.insert(newStudent)
                .create(newUser)
                .then(createUser =>{
                    return createUser;
                })
                .catch(err => {
                    return err;
                });
   },
   getAllUsers : function() {
       return userCollection
                .find()
                .then(allUsers => {
                    return allUsers
                })
                .catch(err => {
                    return err
                });
   },
   getUserById : function(userID) {
       filter = {
           _id: userID
       }
        return userCollection
            .findOne(filter)
            .then(user => {
                return user
            })
            .catch(err => {
                return err
            })
    },
    updateUser: function (userInfo){
        const id = {_id: userInfo.id};
        upUser = userInfo
        // console.log("Im in the schema")
        // console.log(id)
        // console.log(upUser)
        return userCollection
                .updateOne(id, upUser)
                    .then(result => {
                        console.log(result)
                        return result
                    })
                    .catch(err => {
                        return err
                    })

    },
    addRoutineUser:function(userID,userRoutine) {
        const id = {_id:userID}
        // console.log("AddUserTourine")
        // console.log(userRoutine)
        return userCollection
            .findOneAndUpdate(id,{$push:userRoutine})
                .then(result => {
                    console.log("addRoutineUser")
                    console.log(result)
                    return result
                })
                .catch(err => {
                    return err
                })
    },
    updateRoutine:function(userID,positionRoutine,userNewRoutine) {
        const id = {_id:userID}
        // console.log("updateRoutine")
        // console.log(id)
        // console.log(positionRoutine)
        // console.log(userNewRoutine.routines)
        // db.test_invoice.update({user_id : 123456 , "items.item_name":"my_item_one"} , {$inc: {"items.$.price": 10}})
        let dp = `routines.${positionRoutine}`
        let aux = {}
        aux[dp] = userNewRoutine.routines
        
        return userCollection
            .updateOne(id , {'$set': aux})
                .then(result => {
                   return result
                })
                .catch(err => {
                    return err
                })
    },
    deleteUser:function(userID) {
        const id = {_id:userID}

        return userCollection
            .deleteOne(id)
                .then(result => {
                    return result
                })
                .catch(err => {
                    return err
                })
    },
    deleteRoutine:function(userID, positionRoutine,idRoutine) {
        const id = {_id:userID}
        const idR = {_id:idRoutine}
        let dp = `routines.${positionRoutine}`
        //aux[dp] = userNewRoutine.routines
        // console.log(dp)
        return userCollection
            .updateOne(id,{$pull:{"routines":idR}})
        /*
        .updateOne(id, {$unset : {"routines.1" : 1 }})
                    .then(result => {
                        return result
                    })
                    .catch(err => {
                        return err
                    })
        */
                
    // db.users.updateOne({'_id':ObjectId('5ec9e872f189fa10629c7f46')}, {$unset : {"routines.1" : 1 }});
    
    /*db.users.updateOne(
        
        {'_id':ObjectId('5ec9e872f189fa10629c7f46')}, 
        {$pull : 
            {"routines":{'_id':ObjectId('5eca2f4eb3bd8616968e7641')}}
        }
        
        )*/
    },
    addFavoriteRoutine:function(userID,userRoutine) {
        const id = {_id:userID}
        console.log("AddUserFavoriteRoutine")
        // console.log(userRoutine)
        return userCollection
            .findOneAndUpdate(id,{$push:{"favorites":userRoutine}},{useFindAndModify: false})
                .then(result => {
                    console.log(result)
                    return result
                })
                .catch(err => {
                    return err
                })
    },
    deleteFavoriteRoutine:function(userID, positionRoutine,idRoutine) {
        const id = {_id:userID}
        const idR = {_id:idRoutine}
        let dp = `favorites.${positionRoutine}`
        //aux[dp] = userNewRoutine.routines
        console.log("Routine")
        return userCollection
            .updateOne(id,{$pull:{"favorites":idR}})
    }
    /*
   },
               .forEach(function (doc) {
                doc.routines.forEach(function (event) {
                if (event._id == routineId) {
                    event = userNewRoutine;
                }
                });
                db.users.save(doc);
            });

            
   deleteStudentById : function (studentId) {
        const filter = {id: studentId};
        return studentsCollection
                    .deleteOne(filter)
                        .then(deleted => {
                            if(deleted.n == 0) {
                                return undefined
                            } else {
                                return true
                            } 
                        })
                        .catch(err => {
                            return err
                        })
   }
   */
}

module.exports = {
    User: userCollection,
    Users: Users
}
// module.exports = {Users}
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var usersModel = require('../models/usersModel');
var Users = usersModel.Users

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('profile', { 
    title: 'Profile',
    name: req.user.name,
    id: req.user.id,
    age: req.user.age,
    actual_weight: req.user.actual_weight,
    initial_weight: req.user.initial_weight,
    height: req.user.height,
    goal: req.user.goal,
    routines: req.user.routines
  });
  // console.log(req.user)
  /*
  let userID = req.user.id
  Users
  .getUserById(userID)
  .then(result => {
      console.log(result)
  })
  .catch(err =>{
      res.statusMessage = "Something is wrong with the Database. Try again later."
      return res.status(500).end();
  })
  */
});

router.get('/userInfo/:id',isLoggedIn ,(req,res,next) => {
  let userID = req.params.id
  Users
  .getUserById(userID)
  .then(result => {
      console.log(result)
      return res.status(200).json(result);
  })
  .catch(err =>{
      res.statusMessage = "Something is wrong with the Database. Try again later."
      return res.status(500).end();
  })
})

router.get('/deleteUser/:id',isLoggedIn,(req,res,next) => {
  let userID = req.params.id
  console.log("Delete")
  console.log(userID)

  Users
    .deleteUser(userID)
    .then(result => {
      res.redirect('/')
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).end();
    })
})

router.patch('/userPatch/:id', isLoggedIn, (req,res,next) => {
  let userID = req.params.id
  
  let userUpdate = {}
  if (req.params.id) {
    userUpdate['id'] = req.params.id
  }
  if (req.headers.name) {
    userUpdate['name'] = req.headers.name
  }
  if (req.headers.age) {
    userUpdate['age'] = req.headers.age
  }
  if (req.headers.height) {
    userUpdate['height'] = req.headers.height
  }
  if (req.headers.actual_weight) {
    userUpdate['actual_weight'] = req.headers.actual_weight
  }
  if (req.headers.initial_weight) {
    userUpdate['initial_weight'] = req.headers.initial_weight
  }
  if (req.headers.goal) {
    userUpdate['goal'] = req.headers.goal
  }
  // console.log(userUpdate)
  Users
    .updateUser(userUpdate)
        .then(result => {
            return res.status(202).json(result); 
        })
        .catch(err => {
            return err
        })
      
})

router.post('/userPushRoutine/:id',[jsonParser,isLoggedIn],(req,res,next) => {
    let userID = req.params.id
    // console.log()
    let userRoutine = req.body
    // console.log(userID,userRoutine)
    Users
      .addRoutineUser(userID,userRoutine)
          .then(result => {
            return res.status(202).json(result)
          })
          .catch(err => {
            return err
          })
})

router.patch('/userModifyRoutine/:id',[jsonParser,isLoggedIn], (req,res,next) => {
  let userID = req.params.id
  let positionRoutine = req.body[0]
  let userNewRoutine = req.body[1]
  
  Users
    .updateRoutine(userID,positionRoutine,userNewRoutine)
      .then(result => {
        console.log(result)
        return res.status(202).json(result)
      })
      .catch(err => {
        return err
      })

})

router.delete('/userDeleteRoutine/:id', isLoggedIn, (req,res,next) => { 
  let userID = req.params.id
  let positionRoutine = req.headers.position
  let idRoutine = req.headers.idroutine
  //console.log("Delete")
  //console.log(userID)
  //console.log(positionRoutine)
  //console.log(idRoutine)
  
  Users
    .deleteRoutine(userID,positionRoutine,idRoutine)
      .then(result => {
        console.log(result)
        return res.status(404).json(result)
      })
      .catch(err => {
        return err
      })
  
}),
router.delete('/userDeleteFavorite/:id', isLoggedIn, (req,res,next) => { 
  let userID = req.params.id
  let positionRoutine = req.headers.position
  let idRoutine = req.headers.idroutine
  //console.log("Delete")
  //console.log(userID)
  //console.log(positionRoutine)
  //console.log(idRoutine)
  
  Users
    .deleteFavoriteRoutine(userID,positionRoutine,idRoutine)
      .then(result => {
        // console.log(result)
        return res.status(404).json(result)
      })
      .catch(err => {
        return err
      })
  
})

router.get('/logout',isLoggedIn, (req,res, next) => {
  req.logout()
  res.redirect('/');
})

router.use('/',notLoggedIn, (req,res,next) => {
  next();
})


router.get('/', function(req, res, next) {
  res.render('profile', { title: 'profile'});
  //res.send('login')
});


module.exports = router;


function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

function notLoggedIn(req,res,next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile')
}
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
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('allusers', { 
      title: 'All Users',
      name: req.user.name,
      id: req.user.id 
    });
});

router.get('/response',isLoggedIn, function(req, res, next) {
    console.log("All users request")
    Users
        .getAllUsers()
        .then(result => {
            // console.log(result)
            return res.status(200).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something is wrong with the Database. Try again later."
            return res.status(500).end();
        })
});

router.post('/userPushFavorite/:id',[jsonParser,isLoggedIn],(req,res,next) => {
  let userID = req.params.id
  // console.log(userID)
  let userRoutine = req.body
  // console.log(userID,userRoutine)
  
  Users
    .addFavoriteRoutine(userID,userRoutine)
        .then(result => {
          console.log(result)
          return res.status(202).json(result)
        })
        .catch(err => {
          return err
        })
  
})

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

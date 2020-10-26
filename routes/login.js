var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')

var User = require('../models/usersModel');

var csrfProtection = csrf();
router.use(csrfProtection)



router.use('/',notLoggedIn, (req,res,next) => {
  next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  var messages = req.flash('error')
  res.render('login', { title: 'Login', csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length > 0});
  // res.render('login', { title: 'Login'});
  
});
/*
router.post('/', function(req, res, next) {
  console.log(req.body)
  res.redirect('/')
  //res.send('register')
});
*/
router.post('/',passport.authenticate('local.signup', {
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash: true
}));

router.post('/signin',passport.authenticate('local.signin', {
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash: true
}));

/*
router.get('/profile', function(req, res, next) {
  var messages = req.flash('error')
  res.render('profile', { title: 'Profile', csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length > 0});
  
});
*/

module.exports = router;

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile')
}


function notLoggedIn(req,res,next) {
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}
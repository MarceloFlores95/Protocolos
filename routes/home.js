var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var commentsModel = require('../models/commentsModel');
var Comments = commentsModel.Comments

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


/* GET Home. */
router.get('/', isLoggedIn,function(req, res, next) {
  res.render('home', 
  { title: 'Home', 
    name: req.user.name,
    id: req.user.id,
    email: req.user.email
  });
});

/*POST Home*/
router.post('/postComment',[jsonParser,isLoggedIn],(req,res,next) => {
  let userEmail = req.body.userEmail
  let userComment = req.body.userComment
  let userName = req.body.userName
  // console.log("Entre al router")
  // console.log(userName)
  // console.log(userEmail)
  // console.log(userComment)  
  
  Comments
    .postComment(userComment,userEmail,userName)
      .then(result => {
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

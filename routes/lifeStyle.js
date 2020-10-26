var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')

/* GET lifeStyle. */
router.get('/', function(req, res, next) {
  res.render('lifeStyle', { title: 'Life Style' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('nutrition', { title: 'Nutrition App' });
});

module.exports = router;

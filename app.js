var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
var validator = require('express-validator')
const { DATABASE_URL, PORT} = require( './config/config' );

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var aboutUsRouter = require('./routes/aboutUs');
var nutritionRouter = require('./routes/nutrition');
var lifeStyleRouter = require('./routes/lifeStyle');
var allusersRouter = require('./routes/allusers');


var app = express();

require('./config/passport')

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Permite recibir respuesta del cliente, menos imagenes

app.use(validator());
app.use(cookieParser());
app.use(session({secret:'mysupersecret', resave: false, saveUninitialized: false}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
  res.locals.login = req.isAuthenticated();
  console.log(req.isAuthenticated())
  next()
})

app.use('/about-us', aboutUsRouter)
app.use('/nutrition', nutritionRouter)
app.use('/life-style', lifeStyleRouter)
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/allusers',allusersRouter);
app.use('/', indexRouter);


app.use('/javascripts', express.static(__dirname + './../public/javascripts'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log("This server is running on port 8080")

  new Promise((resolve, reject) => {
    const settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
    mongoose.connect(DATABASE_URL, settings,(err) => {
        if(err) {
            return reject(err);
        }
        else {
            console.log("Database connected succesfully")
            return resolve();
        }
    })
})
.catch(err => {
    console.log(err)
})

})

module.exports = app;

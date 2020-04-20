var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var app = express();
var router = express.Router();
var db = require('./database.js');
var sqlite3 = require('sqlite3').verbose();
var port = 8080;
var md5 = require('md5'); // use for creating a hash for passwords
var bodyParser = require('body-parser');

app.engine( 'handlebars', handlebars( {
  defaultLayout:'index',
  extname: '.handlebars',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/'
}));

app.listen(port, "localhost");
console.log("Visit http://localhost:8080/");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// static delivery of public folder
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('main', {layout : 'index_head'});
});

app.get('/index', (req, res) => {
	res.render('main', {layout : 'index_head'});
});

app.get('/demo', (req, res) => {
  res.render('demo', {layout : 'demo_head'});
});

app.get('/products', (req, res) => {
	res.render('products', {layout : 'product_head'});
});

app.get('/login', (req, res) => {
	res.render('login', {layout : 'login_head'});
});

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

///// init database /////
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database.');
});

// here add in hashing / inserting dummy users / etc

///// sqlite queries /////
const user_select_username = db.prepare('SELECT * FROM User WHERE userName = ?');
const user_create          = db.prepare('INSERT INTO User (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?);');
const user_login           = db.prepare('REPLACE INTO User (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?);');
const user_logout          = db.prepare('REPLACE INTO User (userName, userSession) VALUES (?, NULL);');
const user_session         = db.prepare('SELECT * FROM User WHERE userSession = ?');
const user_add_email       = db.prepare('REPLACE INTO User (userName, userEmail) VALUES (?, ?)');
const order_create         = db.prepare('INSERT INTO Order VALUES (?, ?, ?, ?, ?)');
const orderDetails_create  = db.prepare('INSERT INTO Order Details VALUES (?, ?, ?, ?)');
const productCtgy_get      = db.prepare('SELECT categoryName FROM Product Category JOIN Product ON ProductID WHERE ProductId = ?');

///// database functions /////
function newUser(userName, userEmail, userPassword, userPassword2, req){
  if(userPassword == userPassword2) {
    user_select_username.all([userName], (err, rows) => { // first select user and see if they exist
      if(err){
        console.log(err.message);
      }
      if(rows.length == 0){
        user_create.run([userName, userEmail, userPassword, req.sessionID]);
      }});
  }
  else{
    // insert error message for passwords that don't match
  }
}

function userLogin(userName, userPassword, userEmail sessionID){
  user_select_username.all([username], (err, rows) => {
    if(err){
      // can't find user / not matching password
      console.log(err.message);
    }
    if(rows.length == 0){
      // new user ... create the hash for the password (!!!)
      user_create.run([username, userEmail, userPassword, sessionId]);
    }
  })
}

function userLogout(req) {
  user_session.get([req.sessionID], (err, row) => {
    if(err){
      console.log(err.message);
    }
    user_logout.run(row['userName'], row['userPassword']);
  });
}


module.exports = app;

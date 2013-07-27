var users = require('./users.js');
var express = require('express');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.bodyParser());

app.post('/login', function(req, res){
	users.login(req, res);
});

app.post('/signup', function(req, res){
    users.signup(req, res);
});

app.get('/', function(req, res){
  if(!req.session.username) {
    res.redirect('/login');
  } else {
    res.end("You're Logged In");
  }
});

app.get('/user/*', function(req, res){
  console.log('this is params', req.params[0]);
  res.end('hi');
});


app.get('/login', function(req, res) {
  res.sendfile('./login.html');
});

app.get('/signup', function(req, res) {
  res.sendfile('./signup.html');
});

app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080...');




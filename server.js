var users = require('./users.js');
var express = require('express');
var app = express();
var MongoStore = require('connect-mongo')(express);

app.use(express.cookieParser());
app.use(express.session({
    secret: '1234567890QWERTY',
    store: new MongoStore({
      db: users.sdb
    })
  }));
app.use(express.bodyParser());

app.post('/login', function(req, res){
	users.login(req, res);
});

app.post('/signup', function(req, res){
    users.signup(req, res);
});

app.get('/', function(req, res){
  if(!req.session.username) { res.redirect('/login'); }
  else { res.end("You're Logged In"); }
});

app.get('/home', function(req, res){
  	res.end('home');
});

app.get('/login', function(req, res) {
  res.sendfile('./login.html');
});

app.get('/signup', function(req, res) {
  res.sendfile('./signup.html');
});

app.get('/*', function(req, res) {
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080...');






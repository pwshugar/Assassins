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
  else { res.sendfile("./html/home.html"); }
});

app.get('/home', function(req, res){
  	res.end('home');
});

app.get('/login', function(req, res) {
  res.sendfile('./html/login.html');
});

app.get('/signup', function(req, res) {
  res.sendfile('./html/signup.html');
});

app.get('/css/login.css', function(req, res){
	res.setHeader('Content-Type', 'text/css');
	res.sendfile('./css/login.css')
});

app.get('/css/home.css', function(req, res){
	res.setHeader('Content-Type', 'text/css');
	res.sendfile('./css/home.css')
});

app.get('/*', function(req, res) {
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
console.log('Listening on port 8080...');






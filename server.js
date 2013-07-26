// var express = require('express');
// var index = require('./index.html');
// var app = express();

// // app.get('/', function(req, res){
// //   var body = index.html;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.setHeader('Content-Length', body.length);
// //   res.end(body);
// // });

// app.get('/', function(req, res){
//   console.log("GET")
//   res.send(index.html);
// });

// app.listen(3000);
// console.log('Listening on port 3000');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// console.log('Listening on ' + "port" + '...');
// db.once('open', function callback () {
// });npm install


// var app = require('express')()
//   , server = require('http').createServer(app)
//   , io = require('socket.io').listen(server);

// server.listen(8080);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

var express = require('express');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.bodyParser());
// app.use(express.session({
//   store: new MongoStore({
//     url: 'mongodb://root:myPassword@mongo.onmodulus.net:27017/3xam9l3'
//   }),
//   secret: '1234567890QWERTY'
// }));
app.post('/login', function(req, res){
    req.session.username = req.body.username;    
    req.session.password = req.body.password;
	res.redirect('/home');
});

app.get('/', function(req, res){
  if(!req.session.data) {
    res.redirect('/login');
  } else {
    res.redirect('/home');
  }
});

app.get('/home', function(req, res){
  if(!req.session.username) {
    res.redirect('/login');
  } else {
    res.end('Your Home.');
  }
});

app.get('/login', function(req, res) {
  // if(req.session.lastPage) {
  //   res.write('Last page was: ' + req.session.lastPage + '. ');
  // }

  // req.session.lastPage = '/login';
  res.sendfile(__dirname + '/index.html');
});



app.listen(process.env.PORT || 8080);




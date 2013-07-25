var express = require('express');
var app = express();

app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.get('/', function(req, res){
  res.send('Hello World');
  console.log('tried');
});

app.listen(3000);
console.log('Listening on port 3000');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// console.log('Listening on ' + "port" + '...');
// db.once('open', function callback () {
// });npm install
exports.conn = require('mongoose');
var mongoose = exports.conn;
mongoose.connect('mongodb://127.0.0.1/assassinTest2');
console.log("Connected to 'assassinTest' database");

// Mongoose schemas

var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var User = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true }
});

var UserModel = mongoose.model('users', User);

// Router functions

exports.signup = function(req, res){
  var username = req.body.username.toLowerCase();
  console.log('Retrieving user: ' + username);
  var user_data = {
    username: username,
    password: req.body.password
  };
  var user = new UserModel(user_data);

  UserModel.findOne({'username': username}, function(err, data){
    console.log(data);
    if (data === null){
      user.save( function(error, data){});
      req.session.username = username;    
      res.redirect('/');
    } else {
      res.send('false');
    }
  });
};

exports.login = function(req, res){
  var username = req.body.username.toLowerCase();
  console.log('Retrieving user: ' + username);

  UserModel.findOne({'username': username}, function(err, data){
    if (data === null){
      res.send('false');
    } else if (data.password !== req.body.password){
      res.send('false');
    } else {
      req.session.username = username;
      res.send('true');
    }
  });
};
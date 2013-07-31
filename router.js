exports.conn = require('mongoose');
var mongoose = exports.conn;
mongoose.connect('mongodb://127.0.0.1/assassinTest2');
console.log("Connected to 'assassinTest2' database");

// Mongoose schemas

var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var User = new Schema({
  username: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, trim: true },
  groupname: { type: String, trim: true, lowercase: true },
  fname: { type: String, trim: true },
  lname: { type: String, trim: true },
  age: { type: String, trim: true },
  question: { type: String, trim: true },
  contract: { type: String, trim: true, lowercase: true }
});

var Group = new Schema({
  groupname: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, trim: true },
  admin: { type: String, trim: true, lowercase: true }
});

var UserModel = mongoose.model('users', User);
var GroupModel = mongoose.model('groups', Group);

// Router functions

exports.signup = function(req, res){
  console.log('Retrieving user: ' + req.body.username);
  var user_data = {
    username: req.body.username,
    password: req.body.password
  };
  var user = new UserModel(user_data);

  UserModel.findOne({'username': req.body.username}, function(err, data){
    user.save(function(error, data){
      if (error){
        res.send('false');
      } else {
        req.session.username = req.body.username;    
        res.redirect('/');
      }
    });
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

exports.create = function(req, res){
  console.log('Retrieving groupname: ' + req.body.groupname);
  var group_data = {
    groupname: req.body.groupname,
    password: req.body.password
  };
  var group = new GroupModel(group_data);

  // GroupModel.findOne({'groupname': req.body.groupname}, function(err, data){
    group.save(function(err, data){
      if (err){
        res.send('false');
      } else {
        res.send('true');
      }
    });
  // });
};

















var mongoose = require('mongoose');

// Mongoose schemas

var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var User = new Schema({
  username: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, trim: true },
  groupname: { type: String, trim: true, lowercase: true },
  fname: { type: String, trim: true },
  lname: { type: String, trim: true },
  age: { type: String, trim: true },
  weapon: { type: String, trim: true },
  fact:{ type: String, trim: true },
  contract: { type: String, trim: true, lowercase: true },
  login: { type: Boolean, 'default': true },
  alive: { type: Boolean, 'default': false }
});

var Group = new Schema({
  groupname: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, trim: true },
  admin: { type: String, trim: true, lowercase: true },
  started: { type: Boolean, 'default': false },
  ended: { type: Boolean, 'default': false }
});

var Session = new Schema({
  username: { type: String, required: true, trim: true },
  groupname: { type: String, required: true, trim: true }
});

var UserModel = exports.UM = mongoose.model('users', User);
var GroupModel = exports.GM = mongoose.model('groups', Group);
var SessionModel = exports.SM = mongoose.model('sessions', Session)

// Router functions

exports.signup = function(req, res){
  console.log('Retrieving user: ' + req.body.username);
  var user_data = {
    username: req.body.username,
    password: req.body.password,
    fname: req.body.fname,
    lname: req.body.lname,
    age: req.body.age,
    weapon: req.body.weapon,
    fact: req.body.fact
  };
  var user = new UserModel(user_data);

    user.save(function(error, data){
      if (error){
        res.send('false');
      } else {
        req.session.username = req.body.username;
        req.session.admin = false;
        res.redirect('/');
      }
    });
};

exports.login = function(req, res){
  var username = req.body.username;
  UserModel.findOne({'username': username}, function(err, data){
    if (data === null){
      res.send('false');
    } else if (data.password !== req.body.password){
      res.send('false');
    } else {
      req.session.username = username;
      req.session.admin = false;
      data.login = true;
      data.save();
      res.send('true');
    }
  });
};

exports.logout = function(req, res){
  UserModel.findOne({ 'username': req.session.username }, function(err, data){
    data.login = false;
    data.save();
  });
  req.session.destroy();
  res.end();
};

exports.create = function(req, res){
  var group_data = {
    admin: req.session.username,
    groupname: req.body.groupname,
    password: req.body.password
  };
  var group = new GroupModel(group_data);
  group.save(function(err, data){
    if (err){
      res.send('false');
    } else {
      res.send('true');
    }
  });
};

exports.logcheck = function(req, res){
  if (req.session.username){
    res.send({
      username: req.session.username, 
      groupname: req.session.groupname
    });
  } else {
    res.end();
  }
};

exports.joingroup = function(req, res){
  var groupname = req.body.groupname;
  GroupModel.findOne({'groupname': groupname}, function(err, data){
    if (data === null){
      res.send('false');
    } else if (data.password !== req.body.password){
      res.send('false');
    } else {
      if (req.session.username === data.admin){
        req.session.admin = true;
      }
      UserModel.findOne({ 'username': req.session.username }, function(err, data){
        data.groupname = groupname;
        data.save();
      });
      req.session.groupname = req.body.groupname;
      res.send('true');
    }
  });
};

exports.checklist = function(req, res){
  UserModel.find({groupname: req.session.groupname, login: true}, function (err, data){
    res.send(data);
  })
};

exports.home = function(req, res){
  if (req.session.username && req.session.groupname){
    if (req.session.admin){
      res.sendfile('./html/admin.html');
    } else {
      res.sendfile('./html/home.html');
    }
  } else {
    res.redirect('/');
  }
};

// gets a list of users, assigns each user an assassination contract from the next user in the array
exports.startgame = function(req, res){
  GroupModel.findOne({ groupname: req.session.groupname }, function(err, data){
    data.started = true;
  });
  UserModel.find({ groupname: req.session.groupname, login: true }, 'username', function(err, data){
    var names = data;
    for (var i = 0; i < names.length; i++){ 
      setTimeout(function(i){
        var j = i + 1;
        if (i === names.length - 1){ j = 0; } // contract of last user in names gets the first username in names
        UserModel.findOne({ username: names[i].username }, function(err, data){
          data.alive = true;
          data.contract = names[j].username;
          data.save();
        });   
      }, 0, i);
    }
  });
  res.send('true');
};














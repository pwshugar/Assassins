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
  born: { type: String, trim: true, lowercase: true },
  contract: { type: String, trim: true },
  login: { type: Boolean, 'default': true },
  started:{ type: Boolean, 'default': false } // changed for HR
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

// fake database

var fakeUsers = function (){
  var user_data = {
    username: 'peter',
    password: 'm',
    groupname: 'hackreactor',
    fname: 'Peter',
    lname: 'Shugar',
    age: '28',
    weapon: 'gun',
    fact: 'i love my wife',
    born: 'santa monica',
  };
  var user = new UserModel(user_data);
  user.save(function (error, data){});
  user_data.username = 'nams';
  user_data.fname = 'nams';
  var user2 = new UserModel(user_data);
  user2.save(function (error, data){});
  user_data.username = 'puck';
  user_data.fname = 'puck';
  var user3 = new UserModel(user_data);
  user3.save(function (error, data){});
  // user_data.username = 'pullo';
  // user_data.fname = 'pullo';
  // var user4 = new UserModel(user_data);
  // user4.save(function (error, data){
  // });
  // user_data.username = 'david';
  // user_data.fname = 'david';
  // var user5 = new UserModel(user_data);
  // user5.save(function (error, data){
  // });
  // user_data.username = 'kathleen';
  // user_data.fname = 'kathleen';
  // var user6 = new UserModel(user_data);
  // user6.save(function (error, data){
  // });
  // user_data.username = 'dan';
  // user_data.fname = 'dan';
  // var user7 = new UserModel(user_data);
  // user7.save(function (error, data){
  // });
  // user_data.username = 'nisha';
  // user_data.fname = 'nisha';
  // var user8 = new UserModel(user_data);
  // user8.save(function (error, data){
  // });
  // user_data.username = 'sid';
  // user_data.fname = 'sid';
  // var user9 = new UserModel(user_data);
  // user9.save(function (error, data){
  // });
  // user_data.username = 'raj';
  // user_data.fname = 'raj';
  // var user10 = new UserModel(user_data);
  // user10.save(function (error, data){
  // });
  // user_data.username = 'praveena';
  // user_data.fname = 'praveena';
  // var user11 = new UserModel(user_data);
  // user11.save(function (error, data){
  // });

  var group_data = {
    admin: 'peter',
    groupname: 'hackreactor',
    password: 'm'
  };

  var group = new GroupModel(group_data);
  group.save(function (err, data){ 
    if(err){
      console.log("ERROR");
    }
    console.log('hi');
  });

};

// mongoose.connection.collections['groups'].drop(function (err){});
// mongoose.connection.collections['users'].drop(function (err){});
// fakeUsers(); 
 
// Router functions

exports.signup = function(req, res){
  GroupModel.findOne({ groupname: 'hackreactor' }, function (err, data){
    if (!data.started){
      var user_data = {
        username: req.body.username,
        password: req.body.password,
        groupname: 'hackreactor', // changed for HR
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        weapon: req.body.weapon,
        fact: req.body.fact,
        born: req.body.born
      };
      var user = new UserModel(user_data);

      user.save(function (error, data){
        req.session.username = req.body.username;
        req.session.groupname = 'hackreactor'; // changed for HR
        req.session.admin = false;
        // res.redirect('/');  // changed for HR
        res.send(true)
      });
    } else {
      res.send(false);
    }
  });
};

exports.login = function (req, res){
  var username = req.body.username;
  GroupModel.findOne({ groupname: 'hackreactor' }, function (err, gdata){
    UserModel.findOne({'username': username}, function (err, data){
      if (data === null){
        res.send('false');
      } else if (data.password !== req.body.password){
        res.send('false');
      } else if (gdata.started !== data.started){
        res.send('late');
      } else {
        req.session.admin = false;
        req.session.username = username;
        req.session.groupname = 'hackreactor'; // changed for HR
        if (username === 'peter' && !data.started){ req.session.admin = true; } // changed for HR
        data.login = true;
        data.save();
        res.send(true);
      }
    });
  });
};

exports.logout = function (req, res){
  UserModel.findOne({ 'username': req.session.username }, function (err, data){
    data.login = false;
    data.save();
  });
  req.session.destroy();
  res.end();
};

exports.create = function (req, res){
  var group_data = {
    admin: req.session.username,
    groupname: req.body.groupname,
    password: req.body.password
  };
  var group = new GroupModel(group_data);
  group.save(function (err, data){
    res.send('true');
  });
};

exports.logcheck = function (req, res){
  if (req.session.username){
    res.send({
      username: req.session.username, 
      groupname: req.session.groupname
    });
  } else {
    res.end();
  }
};

exports.joingroup = function (req, res){
  var groupname = req.body.groupname;
  GroupModel.findOne({ 'groupname': groupname }, function (err, groupdata){
    if (groupdata === null){
      res.send(false);
    } else if (groupdata.password !== req.body.password){
      res.send(false);
    } else {
      UserModel.findOne({ 'username': req.session.username }, function (err, userdata){
        if (userdata.groupname !== groupname && userdata.started){
          res.send(null);
        } else {
          if (req.session.username === groupdata.admin && !groupdata.started){
            req.session.admin = true;
          }
          userdata.groupname = groupname;
          userdata.save();
          req.session.groupname = req.body.groupname;
          res.send('true');
        }
      });
    }
  });
};

exports.checklist = function (req, res){
  UserModel.find({groupname: req.session.groupname, login: true}, 'username', function (err, data){
    res.send(data);
  })
};

exports.home = function (req, res){
  if (req.session.username && req.session.groupname){
      console.log(req.session.admin);
    if (req.session.admin){
      res.sendfile('./html/admin.html');
    } else {
      res.sendfile('./html/iohome.html');
    }
  } else {
    // res.redirect('/');
    res.redirect('/login'); // changed for HR
  }
};

// gets a list of users, assigns each user an assassination contract from the next user in the array
exports.startgame = function (req, res){
  req.session.admin = false;
  GroupModel.findOne({ groupname: req.session.groupname }, function (err, data){
    data.started = true;
    data.save();
  });
  UserModel.find({ groupname: req.session.groupname, login: true }, 'username', function (err, data){
    var names = data;
    for (var i = 0; i < names.length; i++){
      setTimeout(function (i){
        var j = i + 1;
        if (i === names.length - 1){ j = 0; } // contract of last user in names gets the first username in names
        UserModel.findOne({ username: names[i].username }, function (err, data){
          data.started = true; // changed for HR
          data.contract = names[j].username;
          data.save();
        });   
      }, 0, i);
    }
  });
  res.send('true');
};

exports.contractUpdate = function (req, res){
  UserModel.findOne({ 'username': req.session.username }, 'contract', function (err, data){
    if (data === null) {
      res.send(null);
    } else {
      if (data.contract){
        if (data.contract === 'dead'){
          res.send('dead');
        } else if (data.contract === req.session.username){
          res.send('win');
        } else {
          UserModel.findOne({ 'username': data.contract }, function (err, data){
            res.send(data);
          });
        }
      } else {
        res.send(null);
      }
    }
  });
};














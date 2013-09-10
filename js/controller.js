var mongo = require('./schema.js')
 , UserModel = mongo.UM
 , GroupModel = mongo.GM;

exports.methods = {

  // creates a new user profile when user signs up
  signup: function(req, res){
    UserModel.findOne({ username: req.body.username }, function (err, data){
      if (!data){
        var user_data = {
          username: req.body.username,
          password: req.body.password,
          fname: req.body.fname[0].toUpperCase() + req.body.fname.slice(1),
          lname: req.body.lname[0].toUpperCase() + req.body.lname.slice(1),
          age: req.body.age,
          weapon: req.body.weapon,
          fact: req.body.fact,
          secret: req.body.secret
        };
        var user = new UserModel(user_data);
        user.save(function (err, data){
          // creates username in cookie
          req.session.username = req.body.username;
          res.send('success')
        });
      } else { res.send('fail'); }
    });
  },

  // checks username and password when user logs in
  login: function (req, res){
    var username = req.body.username;
    UserModel.findOne({ username: username }, function (err, data){
      if (data === null){ res.send('false'); }
      else if (data.password !== req.body.password){ res.send('false'); }
      else {
        // adds username in cookie
        req.session.username = username;
        data.login = true;
        data.save();
        res.send(true);
      }
    });
  },

  // queries user's information from their username
  checkUsername: function (req, res){
    UserModel.findOne({ username: req.body.username }, function (err, data){
      res.send(data);
    });
  },

  // logs out user from game
  logout: function (req, res){
    UserModel.findOne({ 'username': req.session.username }, function (err, data){
      if (data){
        data.login = false;
        data.save();
      }
    });
    // deletes user's cookies
    req.session.destroy();
    res.end();
  },

  // cheks user's cookies to make sure they are logged in
  logcheck: function (req, res){
    if (req.session.username){
      res.send({
        username: req.session.username, 
        groupname: req.session.groupname
      });
    } else { res.end(); }
  },

  // creates a new group and the user is becomes the admin
  creategroup: function (req, res){
    var groupname = req.body.groupname;
    GroupModel.findOne({ groupname: groupname }, function (err, data){
      if (data === null){
        var group_data = {
          admin: req.session.username,
          groupname: req.body.groupname,
          password: req.body.password
        };
        var group = new GroupModel(group_data);
        group.save(function (err, data){
          // adds groupname and admin status to cookies
          req.session.groupname = groupname;
          req.session.admin = true;
          UserModel.findOne({ username: req.session.username }, function (err, userdata){
            userdata.groupname = groupname;
            userdata.save();
            res.send('success');
          });
        });
      } else { res.send(false); }
    });
  },

  // player joins a group that has already been created
  joingroup: function (req, res){
    var groupname = req.body.groupname;
    GroupModel.findOne({ groupname: groupname }, function (err, groupdata){
      if (groupdata === null){ res.send('nogame'); }
      else if (groupdata.password !== req.body.password){ res.send('badpass'); }
      else {
        UserModel.findOne({ username: req.session.username }, function (err, userdata){
          if (userdata.groupname !== groupname && userdata.started){
            res.send('ingame');
          } else {
            /* if the player is an admin, this checks to see if the game has started,
               if it hasn't, player gets admin status true and goes to admin page,
               otherwise player does not get admin status and goes back to the game*/
            if (req.session.username === groupdata.admin && !groupdata.started && !groupdata.winner){
              req.session.admin = true;
            }
            userdata.groupname = groupname;
            userdata.save();
            // adds groupname to cookie
            req.session.groupname = req.body.groupname;
            res.send('success');
          }
        });
      }
    });
  },

  // pulls list of players that are in admin's group to display players who are logged in
  checklist: function (req, res){
    UserModel.find({groupname: req.session.groupname, login: true}, 'username', function (err, data){
      res.send(data);
    })
  },

  // gets a list of players, assigns each user an assassination contract from the next player in the array
  gamestart: function (req, res){
    UserModel.find({ groupname: req.session.groupname, login: true }, 'username', function (err, userdata){
      if (userdata.length < 2){
        res.send('false');
      } else {
        // admin status becomes false once game starts so that admin leaves admin page
        req.session.admin = false;
        GroupModel.findOne({ groupname: req.session.groupname }, function (err, groupdata){
          groupdata.started = true;
          groupdata.save();
          var names = userdata;
          for (var i = 0; i < names.length; i++){
            // assigns assassination contracts for players, setTimeout deals with async of database
            setTimeout(function (i){
              var j = i + 1;
              if (i === names.length - 1){ j = 0; }
              UserModel.findOne({ username: names[i].username }, function (err, data){
                data.started = true;
                data.contract = names[j].username;
                data.save();
              });   
            }, 0, i);
          }
          res.send('true');
        });
      }
    });
  },

  // admin can reset game with same players who are still logged in
  reset: function (req, res){
    // when game resets, admin gains admin status again and goes back to admin page
    req.session.admin = true;
    GroupModel.findOne({ groupname: req.session.groupname }, function (err, data){
      data.winner = undefined;
      data.save();
      res.send();
    });
  },


  // sends admin to admin page if admin status is true
  checkAdmin: function (req, res){
    if (req.session.groupname && req.session.admin){
      res.send('admin');
    } else if (req.session.groupname) {
      res.send('user');
    } else {
      res.send(false);
    }
  },


  // updates message to payer when they are waiting for game to start, in-game, and end-game
  contractUpdate: function (req, res){
    GroupModel.findOne({ groupname: req.session.groupname }, function (err, groupdata){
      if (groupdata !== null){
        var messageObj = { admin: req.session.admin };
        if (!groupdata.started && !groupdata.winner){
          // players have this message displayed when game hasn't started
          messageObj.flag = 'user';
          messageObj.message = 'Game has not started yet.';
          res.send(messageObj);
        } else {
          UserModel.findOne({ username: req.session.username }, 'contract', function (err, userdata){
            if (userdata === null){ res.send(); }
            else {
              if (groupdata.winner){
                UserModel.findOne({ username: groupdata.winner}, function (err, winnerdata){
                  messageObj.flag = 'user';
                  if (req.session.username === groupdata.admin){ messageObj.flag = 'admin'; }
                  // displays winner information to all players
                  messageObj.message = winnerdata.fname + " " + winnerdata.lname + " won!";
                  res.send(messageObj);
                });
              } else if (userdata.contract){
                UserModel.findOne({ username: userdata.contract }, function (err, contractdata){
                  res.send(contractdata);
                });
              } else { res.send(null); }
            }
          });
        }
      } else {
        res.send(null);
      }
    }); 
  },

  // player takes new contract from the player they assassinated, assassinated player is given dead status
  killTarget: function (req, res){
    UserModel.findOne({ username: req.session.username }, function (err, userdata){
      UserModel.findOne({ username: userdata.contract }, function (err, contractdata){
        if (contractdata.contract && userdata.contract){
          if (userdata.username === contractdata.contract){
            GroupModel.findOne({ groupname: userdata.groupname}, function (err, groupdata){
              UserModel.find({ groupname: userdata.groupname }, function (err, alluserdata){
                for (var i = 0; i < alluserdata.length; i++){
                  alluserdata[i].started = false;
                  alluserdata[i].save();
                }
                // updates winner data for the group in the database
                groupdata.winner = userdata.username;
                groupdata.started = false;
                groupdata.save();
                contractdata.contract = undefined;
                userdata.save();
                contractdata.contract = undefined;
                contractdata.save();
                res.send();
              });
            });
          } else {
            userdata.contract = contractdata.contract;
            userdata.save();
            contractdata.contract = undefined;
            contractdata.save();
            res.send();
          }
        } else { res.send(); }
      });
    });
  }

};
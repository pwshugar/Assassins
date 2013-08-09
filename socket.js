var server = require('./server.js');
var router = require('./router.js');
var io = server.io;
  , UserModel = router.UM;
  , GroupModel = router.GM;

io.sockets.on('connection', function (socket){
  socket.volatile.emit('news', 'hello world');

  socket.on('roomUpdate', function (data){
    io.sockets.volatile.emit('roomUpdate');
  });

  socket.on('checkUsername', function (data){
      console.log('data');
    UserModel.findOne({ 'username': data }, function (err, data){
      socket.emit('checkUsernameRes', data);
    });
  });

  socket.on('gamestart', function (data){
    io.sockets.emit('gamestart');
  });

  socket.on('gameover', function (data){
    UserModel.findOne({ username: data }, function (err, data){
      io.sockets.emit(data);
    });
  });

  socket.on('killPlayer', function (data){
    UserModel.findOne({ username: data.contract }, function (err, contractdata){
      UserModel.findOne({ username: data.username }, function (err, userdata){
        if (contractdata.contract && userdata.contract){
          if (userdata.username === contractdata.contract){
            GroupModel.findOne({ groupname: userdata.groupname}, function (err, groupdata){
              UserModel.find({ groupname: userdata.groupname }, function (err, alluserdata){
                for (var i = 0; i < alluserdata.length; i++){
                  alluserdata[i].started = false;
                  alluserdata[i].save();
                }
                groupdata.winner = userdata.username;
                groupdata.started = false;
                groupdata.save();
                contractdata.contract = undefined;
                userdata.save();
                contractdata.contract = undefined;
                contractdata.save();
                io.sockets.emit('roomUpdate');
              });
            });
          } else {
            userdata.contract = contractdata.contract;
            userdata.save();
            contractdata.contract = undefined;
            contractdata.save();
            io.sockets.emit('roomUpdate');
          }
        } else { io.sockets.emit('roomUpdate'); }
      });
    });
  });

});
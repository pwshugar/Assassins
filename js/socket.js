exports.setup = function (io){

  io.sockets.on('connection', function (socket){
    socket.volatile.emit('news', 'hello world');

    socket.on('roomUpdate', function (data){
      io.sockets.volatile.emit('roomUpdate');
    });

    socket.on('test', function (data){
      io.sockets.volatile.emit('testback');
    });

    socket.on('gamestart', function (data){
      io.sockets.emit('roomUpdate');
    });

    socket.on('gameover', function (data){
      UserModel.findOne({ username: data }, function (err, data){
        io.sockets.emit(data);
      });
    });

  });
};
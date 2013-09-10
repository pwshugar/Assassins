exports.setup = function (app, io){
  // real-time updates while players are in-game
  io.sockets.on('connection', function (socket){
    socket.on('roomUpdate', function (data){ io.sockets.volatile.emit('roomUpdate'); });
  });
};
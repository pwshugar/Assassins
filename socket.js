var socket = io.connect('/');
socket.on('news', function (data) {
  console.log(data);
});




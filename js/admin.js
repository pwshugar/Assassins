$(function (){

  var socket = io.connect('/');
    socket.on('news', function (data){
      console.log(data);
    });

    socket.on('roomUpdate', function (data){
      console.log('room update');
      checklist();
    });

	 $("#startgame").on('click',function (){
    $.ajax({
      url:"/startgame",
      type: "post",
      data: {},
      success: function (data){
        return;
        // need to do something
      }
    });
  });

  $("#fakeLink").on('click',function (){
    $.ajax({
      url:"/logout",
      type: "post",
      data: {},
      success: function (data){
        socket.emit('roomUpdate');
        window.location.href = '/';
      }
    });
  });

	var checklist = function (){
	  $.ajax({
      url:"/checklist",
      type: "post",
      data: {},
      success: function (data){
        if (data[0].alive) {
        	// do something
        }
        $('li').remove();
        for (var i = 0; i < data.length; i++){
        	$('#list').append('<li>' + data[i].username[0].toUpperCase() + data[i].username.slice(1));
        }
      }
    });
	};

  var logcheck = function (){
    $.ajax({
      url:"/logcheck",
      type: "post",
      data: {},
      success: function (data){
        $('#welcome').text("Welcome, " + data.username[0].toUpperCase() + data.username.slice(1));
        $('#roomname').text(data.groupname[0].toUpperCase() + data.groupname.slice(1) + " - Admin");
      }
    });
  };

  logcheck();
  checklist();
  console.log('?');

});
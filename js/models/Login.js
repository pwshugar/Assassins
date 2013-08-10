var Login = Backbone.Model.extend({

  initialize: function (){
  },

  login: function (){
  	socket.emit('roomUpdate');
  }

});


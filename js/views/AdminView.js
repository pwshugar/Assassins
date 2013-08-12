var AdminView = Backbone.View.extend({

  initialize: function (){
    var self = this;
    this.model.on('listRefresh', function (){
      listUpdate(self.model.attributes.list);
    });

    var listUpdate = function (data){
      $('li').remove();
      for (var i = 0; i < data.length; i++){
        $('#list').append('<li>' + data[i].username[0].toUpperCase() + data[i].username.slice(1));
      }
    };

  },

  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1>Welcome</h1>\
      <div><button class="edit" type="button" id="logout">Log out</button></div>\
    </div>\
    <div class="scrollable">\
      <div class="editor flex-none" id="divIn">\
        <div class="well-header" id="infoarea">Player List</div>\
        <div class="well" id="list"></div>\
        <button class="black large" id="start" >Start Game</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #logout': 'clicklogout',
    'click #start': 'start'
  },

  clicklogout: function (){ this.logout(this.model); },
  start: function (){ this.gamestart(this.model); },

  logout: function (model){           
    $.ajax({
      url:"/logout",
      type: "post",
      data: {},
      success: function (data){
        model.trigger('logout');
      }
    });
  },

  gamestart: function (model){
    $.ajax({
      url:"/gamestart",
      type: "post",
      data: {},
      success: function (data){
        if (data === 'true'){
          model.trigger('gamestart');
        } else {
          alert('The game needs at least two people.');
        }
      }
    });
  },

  render: function (){
  	this.$el.html(this.template());

    return this.el;
  }

});









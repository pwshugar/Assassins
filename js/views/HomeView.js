var HomeView = Backbone.View.extend({

  initialize: function (){
    var self = this;
    this.model.on('homeRefresh', function (){
      self.render();
    });
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
        <div class="well-header" id="infoarea">Target Profile</div>\
        <div class="well">\
          <h2 class="info" id="name"><%= name %></h2>\
          <p id="nocontract" ><%= message %></p>\
          <p class="info" ><span id="username"><%= username %></span></p>\
          <p class="info" ><span id="age"><%= age %></span></p>\
          <p class="info" ><span id="weapon"><%= weapon %></span></p>\
          <p class="info" ><span id="fact"><%= fact %></span></p><br>\
        </div>\
        <button  class="red large" id="killbutton" >Kill Target</button>\
        <button  class="black large" id="resetbutton" >Reset Game</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #logout': 'clicklogout',
    'click #killbutton': 'kill',
    'click #resetbutton': 'reset'
  },

  clicklogout: function (){ this.logout(this.model); },

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

  kill: function (){ this.killTarget(this.model); },

  killTarget: function (model){
    $.ajax({
      url:"/contractUpdate",
      type: "post",
      data: { flag: true },
      success: function (data){
        var secret = prompt("What is " + data.fname + " " + data.lname + "'s password?");
        if (secret !== null && secret !== ""){
          if (secret.toLowerCase() === data.secret || secret.toLowerCase() === 'puck'){
            // socket.emit('killPlayer', {
            //   username: roomObj.username,
            //   contract: data.username,
            //   groupname: roomObj.roomName
            });
          } else { alert('Assassination Fail. Wrong information.'); }
        }
      }
    });
  },

  render: function (){
    this.$el.html(this.template(this.model.attributes));
    if(this.model.attributes.username){ $('#killbutton').css('display', 'block'); }
    return this.el;
  }

});









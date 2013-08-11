var JoinView = Backbone.View.extend({
  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1>Welcome</h1>\
      <div class="right"><button type="button" class="button" id="logout">Log out</a></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main" id="joinDiv">\
      <div class="editor flex-none" id="joinDiv">\
        <div class="well-header" id="infoarea">Join a Game</div>\
        <div class="fields well">\
          <div class="field"><label for="groupname">Group</label><input type="text" name="groupname" id="groupname"></div>\
          <div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>\
        </div>\
      </div>\
      <button id="join" class="black large">Join Game</button><br>\
      <div class="well-header" id="infoarea">Need to create a new game?</div><br>\
      <button id="goCreate" type="button" class="button black large">Create a Game</a>\
    </div>'
  ),

  events: {
    'click #logout': 'clicklogout',
    'click #goCreate': 'goCreate',
    'click #join': 'join',
    'keypress input': 'keypress'
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

  goCreate: function (){ this.model.trigger('goCreate'); },

  join: function (){ this.joinGame(this.model); },
  keypress: function (e){ if(e.which === 13) { this.joinGame(this.model); }},

  joinGame: function (model){
    if ($('#groupname')[0].value === '' || $('#password')[0].value === ''){
      alert('Please enter a groupname and password.')
    } else {
      $.ajax({
        url:"/joingroup",
        type: "post",
        data: {
          groupname: $('#groupname')[0].value.toLowerCase(),
          password: $('#password')[0].value
        },
        success: function (data){
          if (data === 'nogame'){
            $('#groupname')[0].value = '';
            $('#password')[0].value = '';
            alert('This group has not been created.');
          } else if (data === 'badpass'){
            $('#password')[0].value = '';
            alert('Incorrect password.');
          } else if (data === 'ingame'){
            $('#groupname')[0].value = '';
            $('#password')[0].value = '';
            alert("You cannot join another game until you finish the game in progress.");
          } else {
            model.joinGame();
          }
        }
      });
    }
  },

  render: function (){
    this.$el.html(this.template());
    return this.el;
  }

});

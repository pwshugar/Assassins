var CreateView = Backbone.View.extend({

  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1>Welcome</h1>\
      <div class="right"><button type="button" class="button" id="logout">Log out</a></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main" id="createDiv">\
      <div class="editor flex-none" id="joinDiv">\
        <div class="well-header" id="infoarea">Create a Game</div>\
        <div class="fields well">\
          <div class="field"><label for="groupname">Group</label><input type="text" name="groupname" id="groupname"></div>\
          <div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>\
          <div class="field"><label for="retype">Retype</label><input type="password" name="retype" id="retype"></div>\
        </div>\
      </div>\
      <button id="create" class="black large">Create Game</button><br>\
      <div class="well-header" id="infoarea">Want to join a game?</div><br>\
      <button id="goJoin" type="button" class="button black large">Join a Game</button>\
    </div>'
  ),

  events: {
    'click #logout': 'logout',
    'click #goJoin': 'goJoin',
    'click #create': 'createGame',
    'keypress input': 'keypress'
  },

  logout: function (){
    var model = this.model;
    $.ajax({
      url:"/logout",
      type: "post",
      data: {},
      success: function (data){
        model.trigger('logout');
      }
    });
  },

  goJoin: function (){ this.model.trigger('goJoin'); },
  keypress: function (e){ if(e.which === 13) { this.createGame(); }},

  createGame: function (){
    var model = this.model;
    if ($('#groupname')[0].value.length < 1){
    alert("Please enter a groupname!");
  } else if ($('#groupname')[0].value.length > 20){
    $('#groupname')[0].value = '';
    $('#password')[0].value = '';
    $('#retype')[0].value = ''
    alert("Groupname length exceeds limit!");
  } else if ($('#password')[0].value.length < 1){
    alert("Please enter a password!");
  } else if ($('#password')[0].value.length > 20){
    $('#groupname')[0].value = '';
    $('#password')[0].value = '';
    $('#retype')[0].value = ''
    alert("Password length exceeds limit!");
  } else if($('#password')[0].value !== $('#retype')[0].value) {
    $('#password')[0].value = '';
    $('#retype')[0].value = '';
    alert("Please retype password!");
  } else if ($('#groupname')[0].value.match(/</i) || $('#password')[0].value.match(/</i)){
    $('#groupname')[0].value = '';
    $('#password')[0].value = '';
    $('#retype')[0].value = '';
    alert("Invalid character '<'");
  } else {
    $.ajax({  
      url:"/creategroup",
      type: "post",
      data: {
        groupname: $('#groupname')[0].value.toLowerCase(),
        password: $('#password')[0].value
      },
      success: function (data){
        if (data === false){
          $('#groupname')[0].value = '';
          $('#password')[0].value = '';
          $('#retype')[0].value = '';
          alert('Group already created.');
        } else { model.trigger('createGame'); }
      }
    });
  }
  },


  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
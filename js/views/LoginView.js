var LoginView = Backbone.View.extend({

  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1>Sign In</h1>\
      <div class="right"><button id="goSignup" type="button" class="button">Sign Up</button></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main">\
      <div class="logo">Assassins</div>\
      <div class="editor flex-none">\
        <div class="fields well">\
          <div class="field"><label for="username">Username</label><input type="text" name="username" id="username"></div>\
          <div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>\
        </div>\
      </div>\
      <button type="button" id="login" class="black large">Sign In</button>\
    </div>'
  ),

  events: {
    'click #goSignup': 'goSignup',
    'click #login': 'login',
    'keypress input': 'keypress'
  },

  goSignup: function (){ this.model.trigger('goSignup'); },
  keypress: function (e){ if(e.which === 13) { this.login(); }},
  
  // validates player's username and password and logs player in
  login: function (){
    var model = this.model;
    $.ajax({  
      url:"/login",
      type: "post",
      data: {
        username: $('#username')[0].value.toLowerCase(),
        password: $('#password')[0].value
      },
      success: function(data){
        if (data === 'false'){
          $('#username')[0].value = '';
          $('#password')[0].value = '';
          alert('Incorrect username/password.');
        } else if (data === 'late'){
          $('#username')[0].value = '';
          $('#password')[0].value = '';
          alert('Game already started.');
        } else {
          model.trigger('login');
        }
      }
    });
  },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
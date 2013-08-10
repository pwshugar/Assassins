var SignupView = Backbone.View.extend({
  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(

      '<div class="header">' +
        '<h1 id="h">Sign Up</h1>' +
        '<div class="right"><button id="switch" type="button" class="button">Sign In</button></div>' +
      '</div>' +
      '<div class="scrollable box-vertical box-center-main" id="usernamePassword">' +
        '<div class="logo">Assassins</div>' +
        '<div class="editor flex-none">' +
          '<div class="fields well">' +
            '<div class="field"><label for="username">Username</label><input type="text" name="username" id="username"></div>' +
            '<div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>' +
            '<div class="field"><label for="retype">Retype</label><input type="password" name="password" id="retype"></div>' +
          '</div>' +
          '<button id="signup" class="black large">Create an Account</button>' +
        '</div>' +
      '</div>'

    ),
  events: {
    'click #switch': 'switch',
    'click #signup': 'signup'
  },

  switch: function (){
    this.model.trigger('login');
  },

  signup: function (){
    console.log('signup');
  },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
var LoginView = Backbone.View.extend({
  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(

  '<div class="header">' +
    '<h1>Sign In</h1>' +
    '<div class="right">' +
      '<button id="signup" type="button" class="button">Sign Up</button>' +
    '</div>' +
  '</div>' +
  '<div class="scrollable box-vertical box-center-main">' +
    '<div class="logo">Assassins</div>' +
    '<div class="editor flex-none" id="usernamePassword">' +
      '<div class="fields well">' +
        '<div class="field">' +
          '<label for="username">Username</label>' +
          '<input type="text" name="username" id="username">' +
        '</div>' +
        '<div class="field">' +
          '<label for="password">Password</label>' +
          '<input type="password" name="password" id="password">' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<button type="button" id="signin" class="black large">Sign In</button>' +
  '</div>'

    ),
  events: {
    'click #signin': 'signin',
    'click #signup': 'signup'
  },

  signin: function (){
    console.log('signin');
  },

  signup: function (){
    console.log('signup');
  },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
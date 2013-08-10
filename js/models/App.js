var App = Backbone.Model.extend({

  initialize: function (){
  	var self = this;
    this.set('login', new Login());
    this.set('signup', new Signup());

    this.get('login').on('signup', function (){
      self.goSignup();
    });

    this.get('signup').on('login', function (){
      self.goLogin();
    });

  },

  checkView: function (){
  	this.trigger('login');
  },

  goSignup: function (){
  	this.trigger('signup');
  },

  goLogin: function (){
  	this.trigger('login');
  }

}); 
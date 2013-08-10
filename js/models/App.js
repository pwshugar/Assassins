var App = Backbone.Model.extend({

  initialize: function (params){
    var socket = params;
  	var self = this;
    this.set('login', new Login());
    this.set('signup', new Signup());
    this.set('profile', new Profile());
    this.set('join', new Join());
    this.set('create', new Create());

    this.get('login').on('goSignup', function (){
      self.goSignup();
    });

    this.get('login').on('loggedIn', function (){
      socket.emit('roomUpdate');
      self.goJoin();
    });

    this.get('signup').on('goLogin', function (){
      self.goLogin();
    });

    this.get('signup').on('checkedUsername', function (){
      self.goProfile();
    });

    this.get('profile').on('goLogin', function (){
      self.goLogin();
    });

    this.get('profile').on('createdProfile', function (){
      socket.emit('roomUpdate');
      self.goJoin();
    });

    this.get('join').on('goCreate', function (){
      self.goCreate();
    });

    this.get('join').on('loggedOut', function (){
      self.goLogin();
    });

    this.get('create').on('goJoin', function (){
      self.goJoin();
    });

    this.get('create').on('loggedOut', function (){
      self.goLogin();
    });

    this.get('create').on('logout', function (){
      self.goLogin();
    });

  },

  checkView: function (){ this.trigger('goLogin'); },
  goSignup: function (){ this.trigger('goSignup'); },
  goProfile: function (){ this.trigger('goProfile'); },
  goLogin: function (){ this.trigger('goLogin'); },
  goJoin: function (){ this.trigger('goJoin'); },
  goCreate: function (){ this.trigger('goCreate'); }

}); 
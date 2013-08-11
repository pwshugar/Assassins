var App = Backbone.Model.extend({

  initialize: function (params){
    var socket = params;
  	var self = this;
    this.set('login', new Login());
    this.set('signup', new Signup());
    this.set('profile', new Profile());
    // this.set('join', new Join());
    this.set('create', new Create());
    this.set('home', new Home());
    this.set('admin', new Admin());


    socket.on('roomUpdate', function (){
      self.get('home').contractUpdate(self.get('home'));
      self.get('admin').listUpdate(self.get('admin'));
    });

    this.get('login').on('goAdmin', function (){
      self.goAdmin();
    });

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

    this.get('profile').on('goJoin', function (){
      self.goJoin();
    });

    this.get('profile').on('goSignup', function (){
      self.goSignup();
    });

    // this.get('join').on('goCreate', function (){
    //   self.goCreate();
    // });

    // this.get('join').on('logout', function (){
    //   socket.emit('roomUpdate');
    //   self.goLogin();
    // });

    // this.get('join').on('joinGame', function (){
    //   socket.emit('roomUpdate');
    //   self.checkAdmin(self, socket);
    // });

    this.get('home').on('goHome', function (){
      socket.emit('roomUpdate');
      self.goHome();
    });

    this.get('home').on('goCreate', function (){
      self.goCreate();
    });

    this.get('home').on('joinGame', function (){
      socket.emit('roomUpdate');
      self.checkAdmin(self, socket);
    });

    this.get('home').on('logout', function (){
      socket.emit('roomUpdate');
      self.goLogin();
    });

    this.get('create').on('goJoin', function (){
      self.goJoin();
    });

    this.get('create').on('logout', function (){
      socket.emit('roomUpdate');
      self.goLogin();
    });

    this.get('create').on('createGame', function (){
      socket.emit('roomUpdate');
      self.checkAdmin(self, socket);
    });

    this.get('admin').on('logout', function (){
      socket.emit('roomUpdate');
      self.goLogin();
    });

    this.get('admin').on('gamestart', function (){
      socket.emit('gamestart');
      self.goHome();
    });

  },

  checkView: function (){ this.trigger('goLogin'); },
  listReady: function (){ this.trigger('listReady'); },
  goSignup: function (){ this.trigger('goSignup'); },
  goProfile: function (){ this.trigger('goProfile'); },
  goLogin: function (){ this.trigger('goLogin'); },
  goJoin: function (){ this.trigger('goJoin'); },
  goCreate: function (){ this.trigger('goCreate'); },
  goHome: function (){ this.trigger('goHome'); },
  goAdmin: function (){ this.trigger('goAdmin'); },

  checkAdmin: function (self, socket){
    $.ajax({
      url:"/checkAdmin",
      type: "post",
      data: {},
      success: function (data){
        socket.emit('roomUpdate');
        if (data === 'admin'){
          self.trigger('goAdmin');
        } else {
          self.trigger('goHome');
        }
      }
    });
  }

}); 
var AppView = Backbone.View.extend({

  initialize: function (params){
    var self = this;

    this.model.on('goLogin', function (){
      self.render(new LoginView({ model: self.model.get('login') }));
    });

    this.model.on('goSignup', function (){
      self.render(new SignupView({ model: self.model.get('signup') }));
    });

    this.model.on('goProfile', function (){
      self.render(new ProfileView({ model: self.model.get('profile') }));
    });

    this.model.on('goJoin', function (){
      self.render(new JoinView({ model: self.model.get('join') }));
    });
    
    this.model.on('goCreate', function (){
      self.render(new CreateView({ model: self.model.get('create') }));
    });
    
    this.model.on('goHome', function (){
      self.render(new HomeView({ model: self.model.get('home') }));
    });

    this.model.checkView();
  },

  render: function (view){
    $('.signIn_fancy').remove();
    $('body').append(view.render());
  }

});
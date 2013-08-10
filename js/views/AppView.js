var AppView = Backbone.View.extend({

  initialize: function (params){
    var self = this;

    this.model.on('login', function (){
      self.render(new LoginView({ model: self.model.get('login') }));
    });

    this.model.on('signup', function (){
      self.render(new SignupView({ model: self.model.get('signup') }));
    });

    this.model.checkView();
  },

  render: function (view){
    $('.signIn_fancy').remove();
    $('body').append(view.render());
  }

});
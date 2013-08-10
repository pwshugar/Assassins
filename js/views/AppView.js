var AppView = Backbone.View.extend({

  initialize: function (params){
    var self = this;
    this.model.on('login', function (){
      self.render(new LoginView({ model: self.model.get('login') }));
    });

    this.model.checkView();
  },

  render: function (view){
    $('body').append(view.render());
  }

});
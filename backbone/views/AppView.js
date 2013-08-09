var AppView = Backbone.View.extend({
  tagName: 'div',
  className: 'signIn_fancy',

  initialize: function (params){
    this.render();
    return this
    // this.model.on('login', function (){
    //   this.render(new LoginView());
    // });
  },

  render: function (view){
    console.log('yo');
    var Model = Backbone.Model.extend({});
    var loginView = new LoginView();
    $('body').append(this.$el.append(loginView.render()));
  }

});
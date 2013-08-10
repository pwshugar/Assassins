var App = Backbone.Model.extend({

  initialize: function(){
    console.log('hi');

    this.set('login', new Login());

    this.get('login').on('signup', function (){
      console.log('Heard');
    });

  },

  checkView: function (){
  	this.trigger('login');
  }

}); 
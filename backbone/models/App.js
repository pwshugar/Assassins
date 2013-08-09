var App = Backbone.Model.extend({

  initialize: function(){
    this.trigger('login');
    console.log('hi')
  },

}); 
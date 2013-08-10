var Login = Backbone.Model.extend({

  initialize: function (){
  },

  login: function (){
  	// validate
  	this.trigger('loggedIn');
  }

}); 
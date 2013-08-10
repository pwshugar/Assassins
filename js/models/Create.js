var Create = Backbone.Model.extend({

  initialize: function (){
  },

  create: function (){
  	// validate
  	this.trigger('created');
  },

  logout: function (){
  	// logout
  	this.trigger('loggedOut')
  }

}); 
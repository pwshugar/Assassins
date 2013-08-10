var Join = Backbone.Model.extend({

  initialize: function (){
  },

  join: function (){
  	// validate
  	this.trigger('joined');
  },

  logout: function (){
  	// logout
  	this.trigger('loggedOut')
  }

}); 
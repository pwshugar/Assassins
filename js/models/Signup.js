var Signup = Backbone.Model.extend({

  initialize: function (){
  },

  signup: function (){
  	// validate
  	this.trigger('signedUp');
  }

}); 
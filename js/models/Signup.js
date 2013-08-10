var Signup = Backbone.Model.extend({

  initialize: function (){
  },

  checkUsername: function (){
  	// validate
  	this.trigger('checked');
  }

}); 
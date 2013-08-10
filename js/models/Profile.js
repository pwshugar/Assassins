var Profile = Backbone.Model.extend({

  initialize: function (){
  },

  createProfile: function (){
  	// validate
  	this.trigger('createdProfile');
  }

}); 
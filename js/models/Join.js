var Join = Backbone.Model.extend({

  initialize: function (){
  },

  join: function (){
  	// validate
  	this.trigger('joined');
  },

});
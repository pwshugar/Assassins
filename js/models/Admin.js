var Admin = Backbone.Model.extend({

  initialize: function (){

  	this.set('name', 'Peter Shugar');
  	this.set('username', 'peter');
  	this.set('age', '28');
  	this.set('weapon', 'Zombies');
  	this.set('fact', 'I have a hairless cat');
  	this.set('message', 'hi');

  },

  listUpdate: function (self){
	$.ajax({
	  url:"/checklist",
	  type: "post",
	  data: {},
	  success: function (data){
		self.set('list', data);
		self.trigger('listRefresh');
	  }
	});
  }

});


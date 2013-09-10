var Signup = Backbone.Model.extend({

  initialize: function (){
    this.set('data', {});
  },

  saveUsername: function (data){
    console.log(this.attributes.data);
    this.set('data', data);
    console.log(this.attributes.data);
    this.trigger('goProfile');
  }

});

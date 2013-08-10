var Signup = Backbone.Model.extend({

  initialize: function (params){
  },

  infoStore: {},

  saveUsername: function (){
    this.infoStore.username = $('#username')[0].value.toLowerCase();
    this.infoStore.password = $('#password')[0].value;
    this.trigger('checkedUsername');
  }

});

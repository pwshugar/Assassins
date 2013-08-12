var Home = Backbone.Model.extend({

  initialize: function (){
    this.set('data', { message: undefined });
    this.set('username', undefined);
    this.set('name', undefined);
    this.set('age', undefined);
    this.set('weapon', undefined);
    this.set('fact', undefined);
    this.set('message', undefined);
  },

  contractUpdate: function (self){
    $.ajax({
      url:"/contractUpdate",
      type: "post",
      data: { flag: false },
      success: function (data){
        if (data.username !== self.attributes.data.username || data.message !== self.attributes.data.message){
          self.set('data', data);
        }
      }
    });
  },

  joinGame: function (){
    var self = this;
    $.ajax({
      url:"/contractUpdate",
      type: "post",
      data: { flag: false },
      success: function (data){
        if (data.admin){ self.trigger('goAdmin'); }
        else { self.trigger('goHome'); }
      }
    });
  }

});


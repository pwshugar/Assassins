var Admin = Backbone.Model.extend({

  initialize: function (){
    this.set('list', []);
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
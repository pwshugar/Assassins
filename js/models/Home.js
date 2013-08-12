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
        if (data.username !== self.attributes.data.username){
          self.set('data', data);
        } else {
          if (data.message !== self.attributes.data.message){
            self.set('data', data);
          }
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
        if (data.admin){
          self.trigger('goAdmin');
        } else {
          self.trigger('goHome');
        }
      }
    });
  }

  // helper: function (data){
  //   if (data){
  //     if (data.flag){
  //       this.set('message', data.message);
  //       this.set('name', undefined);
  //       this.set('username', undefined);
  //       this.set('age', undefined);
  //       this.set('weapon', undefined);
  //       this.set('fact', undefined);
  //       this.set('flag', undefined);
  //     } else {
  //       this.set('message', undefined);
  //       this.set('name', data.fname + " " + data.lname);
  //       this.set('username', 'Assassin Name: ' + data.username[0].toUpperCase() + data.username.slice(1));
  //       this.set('age', 'Age: ' + data.age);
  //       this.set('weapon', 'Weapon of Choice: ' + data.weapon);
  //       this.set('fact', 'Interesting Fact: ' + data.fact);
  //     }
  //   } else {
  //     this.set('message', 'You were assassinated. Game Over.');
  //     this.set('name', undefined);
  //     this.set('username', undefined);
  //     this.set('age', undefined);
  //     this.set('weapon', undefined);
  //     this.set('fact', undefined);
  //     this.set('flag', undefined);
  //   }
  // }

});


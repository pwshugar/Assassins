var Home = Backbone.Model.extend({

  initialize: function (){

  	this.set('name', 'Peter Shugar');
  	this.set('username', 'peter');
  	this.set('age', '28');
  	this.set('weapon', 'Zombies');
  	this.set('fact', 'I have a hairless cat');
  	this.set('message', 'hi');

  },

  contractUpdate: function (self){
    $.ajax({
      url:"/contractUpdate",
      type: "post",
      data: { flag: false },
      success: function (data){
        if (data){
          if (data.flag){
            self.set('message', data.message);
            self.set('name', undefined);
  	        self.set('username', undefined);
          	self.set('age', undefined);
          	self.set('weapon', undefined);
         	  self.set('fact', undefined);
          	self.set('flag', undefined);
            // if (data.flag === 'admin'){ $('#resetbutton').css('display', 'block'); }
          } else {
            // $('#killbutton').css('display', "block");
            self.set('message', undefined);
            self.set('name', data.fname + " " + data.lname);
  	        self.set('username', 'Assassin Name: ' + data.username[0].toUpperCase() + data.username.slice(1));
          	self.set('age', 'Age: ' + data.age);
          	self.set('weapon', 'Weapon of Choice: ' + data.weapon);
         	self.set('fact', 'Interesting Fact: ' + data.fact);
          }
        } else {
          // $('#killbutton').css('display', "none");
            self.set('message', 'You were assassinated. Game Over.');
            self.set('name', undefined);
  	        self.set('username', undefined);
          	self.set('age', undefined);
          	self.set('weapon', undefined);
           	self.set('fact', undefined);
          	self.set('flag', undefined);
        }
        console.log('contract', data);
        self.trigger('homeRefresh');
      }
    });
  }

});


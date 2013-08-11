var HomeView = Backbone.View.extend({

  initialize: function (){
  },

  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
   '<div class="header">\
      <h1>Welcome</h1>\
      <div><button class="edit" type="button" id="logout">Log out</button></div>\
    </div>\
    <div class="scrollable">\
      <div class="editor flex-none" id="divIn">\
        <div class="well-header" id="infoarea">Target Profile</div>\
        <div class="well">\
          <h2 class="info" id="name"><%= name %></h2>\
          <p id="nocontract" ><%= message %></p>\
          <p class="info" ><b>Assassin Name: </b><span id="username"><%= username %></span></p>\
          <p class="info" ><b>Age: </b><span id="age"><%= age %></span></p>\
          <p class="info" ><b>Weapon of Choice: </b><span id="weapon"><%= weapon %></span></p>\
          <p class="info" ><b>Interesting Fact: </b><span id="fact"><%= fact %></span></p><br>\
        </div>\
        <button  class="red large" id="killbutton" >Kill Target</button>\
        <button  class="black large" id="resetbutton" >Reset Game</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #logout': 'clicklogout',
    'click #killbutton': 'kill',
    'click #resetbutton': 'reset'
  },

  clicklogout: function (){ this.logout(this.model); },

  logout: function (model){           
    $.ajax({
      url:"/logout",
      type: "post",
      data: {},
      success: function (data){
        model.trigger('logout');
      }
    });
  },

  render: function (){

  	this.$el.html(this.template(this.model.attributes));
    return this.el;
  }

});









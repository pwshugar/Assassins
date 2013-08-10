var JoinView = Backbone.View.extend({
  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1>Welcome</h1>\
      <div class="right"><button type="button" class="button" id="logout">Log out</a></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main" id="joinDiv">\
      <div class="editor flex-none" id="joinDiv">\
        <div class="well-header" id="infoarea">Join a Game</div>\
        <div class="fields well">\
          <div class="field"><label for="groupname">Group</label><input type="text" name="groupname" id="groupname"></div>\
          <div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>\
        </div>\
      </div>\
      <button id="joinpost" class="black large">Join Game</button><br>\
      <div class="well-header" id="infoarea">Need to create a new game?</div><br>\
      <button id="goCreate" type="button" class="button black large">Create a Game</a>\
    </div>'
  ),

  events: {
    'click #logout': 'logout',
    'click #goCreate': 'goCreate'
  },

  logout: function (){ this.model.logout(); },
  goCreate: function (){ this.model.trigger('goCreate'); },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
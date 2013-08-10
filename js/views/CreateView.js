var CreateView = Backbone.View.extend({
  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1>Welcome</h1>\
      <div class="right"><button type="button" class="button" id="logout">Log out</a></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main" id="createDiv">\
      <div class="editor flex-none" id="joinDiv">\
        <div class="well-header" id="infoarea">Create a Game</div>\
        <div class="fields well">\
          <div class="field"><label for="groupname">Group</label><input type="text" name="groupname" id="groupname"></div>\
          <div class="field"><label for="password">Password</label><input type="password" name="password" id="password"></div>\
          <div class="field"><label for="retype">Retype</label><input type="password" name="retype" id="retype"></div>\
        </div>\
      </div>\
      <button id="creategroup" class="black large">Create Game</button><br>\
      <div class="well-header" id="infoarea">Want to join a game?</div><br>\
      <button id="goJoin" type="button" class="button black large">Join a Game</button>\
    </div>'
  ),

  events: {
    'click #logout': 'logout',
    'click #goJoin': 'goJoin'
  },

  logout: function (){ this.model.logout(); },
  goJoin: function (){ this.model.trigger('goJoin'); },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
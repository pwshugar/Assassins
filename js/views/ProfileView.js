var ProfileView = Backbone.View.extend({
  tagName: 'div',
  className: 'frame signIn_fancy',

  template: _.template(
    '<div class="header">\
      <h1 id="h">Profile</h1>\
      <div class="right"><button id="goLogin" class="button">Sign In</button></div>\
    </div>\
    <div class="scrollable box-vertical box-center-main" id="info">\
      <div class="well-header" id="infoarea">Name and Age</div>\
      <div class="editor flex-none" id="divIn">\
        <div class="fields well">\
          <div class="field"><label for="fname">First</label><input type="text" name="fname" id="fname"></div>\
          <div class="field"><label for="lname">Last</label><input type="text" name="lname" id="lname"></div>\
          <div class="field"><label for="age">Age</label><input type="text" name="age" id="age"></div>\
        </div>\
        <div class="well-header" id="infoarea">Weapon of Choice</div>\
        <div class="fields well">\
          <div class="field"><input type="text" name="weapon" id="weapon"></div>\
        </div>\
        <div class="well-header" id="infoarea">Interesting Fact About Yourself</div>\
        <div class="fields well"><div class="field"><input type="text" name="fact" id="fact"></div></div>\
        <div class="well-header" id="infoarea">Secret Password</div>\
        <div class="fields well">\
          <div class="field"><input type="text" name="secret" id="secret" placeholder="Important! Do not forget!"></div>\
        </div>\
        <button id="createProfile" class="black large">Create your Profile</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #goLogin': 'goLogin',
    'click #createProfile': 'createProfile'
  },

  goLogin: function (){ this.model.trigger('goLogin'); },
  createProfile: function (){ this.model.createProfile(); },

  render: function (){
  	this.$el.html(this.template());
    return this.el;
  }

});
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
        <button id="create" class="black large">Create your Profile</button>\
      </div>\
    </div>'
  ),

  events: {
    'click #goLogin': 'goLogin',
    'click #create': 'create',
    'keypress input': 'keypress'
  },

  goLogin: function (){ this.model.trigger('goLogin'); },
  keypress: function (e){ if(e.which === 13) { this.createProfile(this.model); }},
  create: function (){ this.createProfile(this.model); },

  createProfile: function (model){
    for (var i = 0; i < $("input").length; i++){
      if ($("input")[i].value === ''){
        alert("Please fill out all info.");
        return;
      } else if ($("input")[i].value.match(/</i)){
        alert("Invalid character '<'");
        for (var i = 0; i < $("#input").length; i++){
          $("input")[i].value = '';
        }
        return;
      } else if ($("input")[i].value.length > 100){
        alert("Your answers are too long!");
        for (var i = 0; i < $("input").length; i++){
          $("input")[i].value = '';
        }
        return;
      }
    }
    $("#create").attr("disabled", "disabled");
    $.ajax({
      url:"/signup",
      type: "post",  
      data: {
        fname: $('#fname')[0].value.toLowerCase(),
        lname: $('#lname')[0].value.toLowerCase(),
        age: $('#age')[0].value,
        weapon: $('#weapon')[0].value,
        fact: $('#fact')[0].value,
        secret: $('#secret')[0].value
      },
      success: function (data){
        if (data === 'success'){
          model.trigger('createdProfile');
        } else if (data === 'fail'){
          alert("Username already taken");
          model.trigger('goSignup');
        }
        $("#infobutton").removeAttr("disabled");
      },
      error: function (data){
        $("#infobutton").removeAttr("disabled");
      }
    });
  },

  render: function (){
    this.$el.html(this.template());
    return this.el;
  }

});



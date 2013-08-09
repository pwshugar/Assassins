var LoginView = Backbone.View.extend({
  template: _.template($('#template').html()),
  // events: { 'click #loginbutton': 'signup' },
  render: function (){
  	$('body').append(
  	'<script id="template" text="text/template">
      <div class="header"> 
        <h1>Sign In</h1>
        <div class="right">
          <a href="/signup" class="button">Sign Up</a>
        </div>
      </div>
      <div class="scrollable box-vertical box-center-main">
        <div class="logo">Assassins</div>
        <div class="editor flex-none" id="usernamePassword">
          <div class="fields well">
            <div class="field">
              <label for="username">Username</label>
              <input type="text" name="username" id="username">
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input type="password" name="password" id="password">
            </div>
          </div>
        </div>
        <button id="loginbutton" class="black large">Sign In</button>
      </div>
    </script>'
  );
  	return this.template();
  }
});
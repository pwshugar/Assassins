exports.setup = function (app, controller) {

  app.post('/killTarget', controller.methods.killTarget);
  app.post('/signup', controller.methods.signup);
  app.post('/checkAdmin', controller.methods.checkAdmin);
  app.post('/checkUsername', controller.methods.checkUsername);
  app.post('/login', controller.methods.login);
  app.post('/creategroup', controller.methods.creategroup);
  app.post('/joingroup', controller.methods.joingroup);
  app.post('/logcheck', controller.methods.logcheck);
  app.post('/logout', controller.methods.logout);
  app.post('/checklist', controller.methods.checklist);
  app.post('/gamestart', controller.methods.gamestart);
  app.post('/contractUpdate', controller.methods.contractUpdate);
  app.post('/reset', controller.methods.reset);

  // get requests

  app.get('/js/lib/backbone-min.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/lib/backbone-min.js');
  });

  app.get('/js/lib/underscore-min.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/lib/underscore-min.js');
  });

  app.get('/js/models/App.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/App.js');
  });

  app.get('/js/models/Login.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Login.js');
  });

  app.get('/js/models/Signup.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Signup.js');
  });

  app.get('/js/models/Profile.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Profile.js');
  });

  app.get('/js/models/Join.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Join.js');
  });

  app.get('/js/models/Create.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Create.js');
  });

  app.get('/js/models/Home.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Home.js');
  });

  app.get('/js/models/Admin.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/models/Admin.js');
  });

  app.get('/js/views/AppView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/AppView.js');
  });

  app.get('/js/views/LoginView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/LoginView.js');
  });

  app.get('/js/views/SignupView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/SignupView.js');
  });

  app.get('/js/views/ProfileView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/ProfileView.js');
  });

  app.get('/js/views/JoinView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/JoinView.js');
  });

  app.get('/js/views/CreateView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/CreateView.js');
  });

  app.get('/js/views/HomeView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/HomeView.js');
  });

  app.get('/js/views/AdminView.js', function (req, res){
    res.setHeader('Content-Type', 'text/javascript');
    res.sendfile('js/views/AdminView.js');
  });

  app.get('/css/login.css', function (req, res){
    res.setHeader('Content-Type', 'text/css');
    res.sendfile('./css/login.css');
  });

  app.get('/css/io.css', function (req, res){
    res.setHeader('Content-Type', 'text/css');
    res.sendfile('./css/io.css');
  });

  app.get('/css/assassin.css', function (req, res){
    res.setHeader('Content-Type', 'text/css');
    res.sendfile('./css/assassin.css')
  });

  app.get('/*', function (req, res){
    res.sendfile('index.html');
  });

};
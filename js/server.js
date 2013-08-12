var router = require('./router.js')
  , mongoose = require('mongoose')
  , express = require('express')
  , app = express()
  , MongoStore = require('connect-mongo')(express)
  , server = require('http').createServer(app)
  , io = exports.io = require('socket.io').listen(server);

var UserModel = router.UM;
var GroupModel = router.GM;

mongoose.connect('mongodb://127.0.0.1/assassin');
// mongoose.connect('mongodb://nodejitsu:7b724dcedab5de16f70e1b7a1ff7168e@dharma.mongohq.com:10081/nodejitsudb3550895571');
console.log("Connected to 'assassin' database");

server.listen(8080);
console.log('Listening on port 8080...');

// Sessions with connext-mongo to store users cookie info in case server goes down

app.use(express.cookieParser());
app.use(express.session({
  secret: '1234567890QWERTY',
  store: new MongoStore({ db: mongoose.connection.db })
}));
app.use(express.bodyParser());

// Router functions are defined in router.js

app.post('/killTarget', function (req, res){
  router.killTarget(req, res);
});

app.post('/signup', function (req, res){
  router.signup(req, res);
});

app.post('/checkAdmin', function (req, res){
  router.checkAdmin(req, res);
});

app.post('/checkUsername', function (req, res){
  router.checkUsername(req, res);
});

app.post('/login', function (req, res){
  router.login(req, res);
});

app.post('/creategroup', function (req, res){
  router.creategroup(req, res);
});

app.post('/joingroup', function (req, res){
  router.joingroup(req, res);
});

app.post('/logcheck', function (req, res){
  router.logcheck(req, res);
});

app.post('/logout', function (req, res){
  router.logout(req, res);
});

app.post('/checklist', function (req, res){
  router.checklist(req, res);
});

app.post('/gamestart', function (req, res){
  router.gamestart(req, res);
});

app.post('/contractUpdate', function (req, res){
  router.contractUpdate(req, res);
});

app.post('/reset', function (req, res){
  router.reset(req, res);
});

// get requests

app.get('/', function (req, res){
  res.sendfile('index.html');
});

// css get requests

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

// all other requests redirect to home

app.get('/*', function (req, res){
  res.redirect('/');
});

// socket io events

io.sockets.on('connection', function (socket){
  socket.volatile.emit('news', 'hello world');

  socket.on('roomUpdate', function (data){
    io.sockets.volatile.emit('roomUpdate');
  });

  socket.on('test', function (data){
    io.sockets.volatile.emit('testback');
  });

  socket.on('gamestart', function (data){
    io.sockets.emit('roomUpdate');
  });

  socket.on('gameover', function (data){
    UserModel.findOne({ username: data }, function (err, data){
      io.sockets.emit(data);
    });
  });

});
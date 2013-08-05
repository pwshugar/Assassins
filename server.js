var router = require('./router.js')
  , mongoose = require('mongoose')
  , express = require('express')
  , app = express()
  , MongoStore = require('connect-mongo')(express)
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var UserModel = router.UM;

mongoose.connect('mongodb://127.0.0.1/assassinTest2');
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

app.post('/login', function (req, res){
  router.login(req, res);
});

app.post('/signup', function (req, res){
  router.signup(req, res);
});

app.post('/create', function (req, res){
  router.create(req, res);
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

app.post('/startgame', function (req, res){
  router.startgame(req, res);
});

app.post('/contractUpdate', function (req, res){
  router.contractUpdate(req, res);
});

// get requests

app.get('/home', function (req, res){
  router.home(req, res);
});

app.get('/login', function (req, res){
  if (req.session.username && req.session.groupname){
	res.redirect('/home');
  } else {
    res.sendfile('./html/login.html');
  }
});

app.get('/signup', function (req, res){
  if (req.session.username && req.session.groupname){
	res.redirect('/home');
  } else {
    res.sendfile('./html/signup.html');
  }
});

// app.get('/', function (req, res){ // changed for HR
//   if (req.session.username && req.session.groupname){
// 	  res.redirect('/home');
//   } else {
//     res.sendfile('./html/create.html');
//   }
// });


// css/js get requests

app.get('/js/admin.js', function (req, res){
  res.setHeader('Content-Type', 'text/javascript');
  res.sendfile('./js/admin.js')
});

app.get('/css/home.css', function (req, res){
  res.setHeader('Content-Type', 'text/css');
  res.sendfile('./css/home.css')
});

app.get('/css/login.css', function (req, res){
  res.setHeader('Content-Type', 'text/css');
  res.sendfile('./css/login.css')
});

app.get('/css/create.css', function (req, res){
  res.setHeader('Content-Type', 'text/css');
  res.sendfile('./css/create.css')
});

// all other requests redirect to home

app.get('/*', function (req, res){
  res.redirect('/home');
});

// socket io events

io.sockets.on('connection', function (socket){
  socket.volatile.emit('news', 'hello world');

  socket.on('roomUpdate', function (data){
    io.sockets.volatile.emit('roomUpdate');
  });

  socket.on('checkUsername', function (data){
    UserModel.findOne({ 'username': data }, function (err, data){
      socket.emit('checkUsernameRes', data);
    });
  });

  socket.on('gamestart', function (data){
    io.sockets.emit('gamestart');
  });

  socket.on('gameover', function (data){
    UserModel.findOne({ username: data }, function (err, data){
      io.sockets.emit(data);
    });
  });

  socket.on('killPlayer', function (data){
    UserModel.findOne({ username: data.contract }, function (err, contractdata){
      UserModel.findOne({ username: data.username }, function (err, userdata){
        userdata.contract = contractdata.contract;
        userdata.save();
        contractdata.contract = 'dead';
        contractdata.save();
        io.sockets.emit('roomUpdate');
      });
    });
  });

});








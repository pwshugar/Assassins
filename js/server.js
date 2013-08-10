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

app.post('/signup', function (req, res){
  router.signup(req, res);
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

app.post('/startgame', function (req, res){
  router.startgame(req, res);
});

app.post('/contractUpdate', function (req, res){
  router.contractUpdate(req, res);
});

app.post('/reset', function (req, res){
  router.reset(req, res);
});

// get requests

app.get('/practice', function (req, res){
  res.sendfile('js/index.html');
});

app.get('/home', function (req, res){
  if (req.session.username && req.session.groupname){
    if (req.session.admin){
      res.sendfile('./html/admin.html');
    } else {
      res.sendfile('./html/home.html');
    }
  } else {
    res.redirect('/signup');
  }
});

app.get('/login', function (req, res){
  if (req.session.username && req.session.groupname){
	  res.redirect('/home');
  } else if (req.session.username){
    res.sendfile('./html/join.html');
  } else {
    res.sendfile('./html/login.html');
  }
});

app.get('/signup', function (req, res){
  if (req.session.username && req.session.groupname){
	  res.redirect('/home');
  } else if (req.session.username){
    res.sendfile('./html/join.html');
  } else {
    res.sendfile('./html/signup.html');
  }
});

app.get('/join', function (req, res){
  if (req.session.username && req.session.groupname){
    res.redirect('/home');
  } else if (req.session.username){
    res.sendfile('./html/join.html');
  } else {
    res.redirect('/login');
  }
});

app.get('/create', function (req, res){
  if (req.session.username && req.session.groupname){
    res.redirect('/home');
  } else if (req.session.username){
    res.sendfile('./html/create.html');
  } else {
    res.redirect('/login');
  }
});

// css get requests



app.get("/js/templates/login", function (req, res){
  res.setHeader('Content-Type', 'text/javascript');
  res.sendfile("js/templates/login");
});

app.get('/js/lib/backbone.js', function (req, res){
  res.setHeader('Content-Type', 'text/javascript');
  res.sendfile('js/lib/backbone.js');
});

app.get('/js/lib/underscore.js', function (req, res){
  res.setHeader('Content-Type', 'text/javascript');
  res.sendfile('js/lib/underscore.js');
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

// app.get('/*', function (req, res){
//   res.redirect('/home');
// });

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
        if (contractdata.contract && userdata.contract){
          if (userdata.username === contractdata.contract){
            GroupModel.findOne({ groupname: userdata.groupname}, function (err, groupdata){
              UserModel.find({ groupname: userdata.groupname }, function (err, alluserdata){
                for (var i = 0; i < alluserdata.length; i++){
                  alluserdata[i].started = false;
                  alluserdata[i].save();
                }
                groupdata.winner = userdata.username;
                groupdata.started = false;
                groupdata.save();
                contractdata.contract = undefined;
                userdata.save();
                contractdata.contract = undefined;
                contractdata.save();
                io.sockets.emit('roomUpdate');
              });
            });
          } else {
            userdata.contract = contractdata.contract;
            userdata.save();
            contractdata.contract = undefined;
            contractdata.save();
            io.sockets.emit('roomUpdate');
          }
        } else { io.sockets.emit('roomUpdate'); }
      });
    });
  });

});
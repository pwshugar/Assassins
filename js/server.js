var controller = require('./controller.js')
  , router = require('./router')
  , mongoose = require('mongoose')
  , express = require('express')
  , app = express()
  , MongoStore = require('connect-mongo')(express)
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

mongoose.connect('mongodb://nodejitsu:1939e708e2bf9bbf4331eda22d2049b3@paulo.mongohq.com:10041/nodejitsudb4362159396');
// mongoose.connect('mongodb://127.0.0.1/assassin');
console.log("Connected to 'assassin' database");

server.listen(8080);
console.log('Listening on port 8080...');

app.use(express.cookieParser());
app.use(express.session({
  secret: '1234567890QWERTY',
  store: new MongoStore({ db: mongoose.connection.db })
}));
app.use(express.bodyParser());

router.setup(app, controller, io);
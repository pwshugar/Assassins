exports.conn = require('mongoose');
var mongoose = exports.conn;
mongoose.connect('mongodb://127.0.0.1/assassinTest2');
console.log("Connected to 'assassinTest' database");

// Mongoose schemas

var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var User = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true }
});

var UserModel = mongoose.model('users', User);

// Router functions

exports.signup = function(req, res){
  console.log('Retrieving user: ' + req.body.username);
  var user_data = {
    username: req.body.username,
    password: req.body.password
  };
  var user = new UserModel(user_data);

  UserModel.findOne({'username': user_data.username}, function(err, data){
    if (data === null){
      user.save( function(error, data){});
      req.session.username = req.body.username;    
      res.redirect('/');
    } else {
      res.redirect('/login')
    }
  });
};

exports.login = function(req, res){
  // console.log('Retrieving user: ' + req.body.username);
  // var user_data = {
  //   username: req.body.username,
  //   password: req.body.password
  // };
  // var user = new UserModel(user_data);

  // UserModel.findOne({'username': user_data.username}, function(err, data){
  //   if (data === null){
  //     user.save( function(error, data){});
  //     req.session.username = req.body.username;    
  //     res.redirect('/');
  //   } else {
  //     res.redirect('/login')
  //   }
  // });
};

// exports.login = function(req, res){
//   var username = req.body.username.toLowerCase();
//   console.log('Retrieving user: ' + username);
//   var check = function(item){
//     if (item === null){
//       res.send('false');
//     } else if (item.password !== req.body.password){
//       res.send('false');
//     } else {
//       req.session.username = req.body.username;
//       res.redirect('true');
//     }
//   };
//   db.collection('users', function(err, collection) {
//     collection.findOne({'username':username}, function(err, item) {
//       check(item);
//     });
//   });
// };

// exports.signu = function(req, res){
//   var username = req.body.username.toLowerCase();
//   console.log('Retrieving user: ' + username);
//   var check = function(item){
//     if (item === null){
//       addUser(req, res);
//       req.session.username = req.body.username;    
//       res.redirect('/');
//     } else {
//       res.redirect('/login')
//     }
//   };
//     db.collection('users', function(err, collection) {
//       collection.findOne({'username':username}, function(err, item) {
//         check(item);
//       });
//     });
// };







// exports.signup = function(req, res){
//     var person_data = {
//       username: req.body.username,
//       password: req.body.password
//     };

//     var person = new Person(person_data);

//     person.save( function(error, data){
//         if(error){
//             res.json(error);
//         }
//         else{
//             res.json(data);
//         }
//     });
// };


 
// var findByUsername = function(req, res) {
//     var username = req.body.username;
//     console.log('Retrieving user: ' + username);
//     db.collection('users', function(err, collection) {
//         collection.findOne({'username':username}, function(err, item) {
//             console.log('this is check', item);
//             return item;
//         });
//     });
// };
 
// var addUser = function(req, res) {
//     var user = req.body;
//     console.log('Adding user: ' + JSON.stringify(user));
//     db.collection('users', function(err, collection) {
//         collection.insert(user, {safe:true}, function(err, result) {
//             if (err) {
//                 res.send({'error':'An error has occurred'});
//             } else {
//                 console.log('Success: ' + JSON.stringify(result[0]));
//                 res.send(result[0]);
//             }
//         });
//     });
// };
 
 
// var populateDB = function() {
 
//     var users = [
//     {
//         username: "shugardude",
//         password: "f00min"
//     },
//     {
//         username: "peter",
//         password: "foo"
//     }];
 
//     db.collection('users', function(err, collection) {
//         collection.insert(users, {safe:true}, function(err, result) {});
//     });
 
// };
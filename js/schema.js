var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var User = new Schema({
  username: { type: String, trim: true, lowercase: true, unique: true },
  password: { type: String, trim: true },
  groupname: { type: String, trim: true, lowercase: true },
  fname: { type: String, trim: true },
  lname: { type: String, trim: true },
  age: { type: String, trim: true },
  weapon: { type: String, trim: true },
  fact:{ type: String, trim: true },
  secret: { type: String, trim: true, lowercase: true },
  contract: { type: String, trim: true },
  login: { type: Boolean, 'default': true },
  started:{ type: Boolean, 'default': false },
  tempUsername: { type: String, trim: true, lowercase: true, unique: true },
  tempPassword: { type: String, trim: true },
});

var Group = new Schema({
  groupname: { type: String, required: true, trim: true, lowercase: true, unique: true },
  password: { type: String, required: true, trim: true },
  admin: { type: String, trim: true, lowercase: true },
  started: { type: Boolean, 'default': false },
  winner: { type: String }
});

var Session = new Schema({});

var UserModel = exports.UM = mongoose.model('users', User);
var GroupModel = exports.GM = mongoose.model('groups', Group);
var SessionModel = mongoose.model('sessions', Session);

// var user = new UserModel();
// user.collection.drop();
// var group = new GroupModel(); 
// group.collection.drop();
// var session = new SessionModel();
// session.collection.drop();
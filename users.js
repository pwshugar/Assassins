var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('assassinTest', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'assassinTest' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.signup = function(req, res){
    var username = req.body.username;
    var check = function(item){
        if (item === null){
            addUser(req, res);
            req.session.username = req.body.username;    
            res.redirect('/');
        } else {
            res.redirect('/login')
        }
    };
    console.log('Retrieving user: ' + username);
    db.collection('users', function(err, collection) {
        collection.findOne({'username':username}, function(err, item) {
            check(item);
        });
    });
};
 
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
 
var addUser = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};
 
 
var populateDB = function() {
 
    var users = [
    {
        username: "Shugardude",
        password: "foo"
    },
    {
        username: "Peter",
        password: "foo"
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};
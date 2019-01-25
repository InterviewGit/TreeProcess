'use strict';

const mongoose = require('mongoose');

const DATABASE_CONECTION = 'mongodb://mongo/test';

var UserSchema = mongoose.Schema({
  name: String
});

var User = exports.User = mongoose.model('User', UserSchema);

exports.initializeMongo = function() {
  mongoose.connect(DATABASE_CONECTION);

  console.log('Trying to connect to ' + DATABASE_CONECTION);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function() {
    console.log('Connected');
    addUser();
  });
}

var addUser = function() {
  var first = new User({
    name: 'Winfred'
  });

  first.save(function (err) {
    if (err) return console.error(err);
    console.log('Error adding');
  });
}
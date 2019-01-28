var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(express.static(__dirname + '/templates'));


mongoose.connect('mongodb://mongo/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

var routes = require('./routes/router');
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});

app.use(function (req, res, next) {
  return res.status(404).sendFile(path.join(__dirname + '/templates/login/index.html'));
})
module.exports = {
  app: app
}

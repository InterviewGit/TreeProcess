var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var User = require('../models/users');
var processTree = require('../processTree');
var path = require('path');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next) {
  return res.sendFile(path.join(__dirname + '/../templates/login/index.html'));
});

router.post('/', urlencodedParser,function (req, res, next) {
  User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password. Go Back');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.redirect('/profile');
    }
  });
})

router.post('/signup', urlencodedParser,function (req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  }  else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized!');
          err.status = 400;
          return next(err);
        } else {
          return res.sendFile(path.join(__dirname + '/../templates/mainpage/index.html'));
        }
      }
    });
});

router.post('/process', bodyParser.text({type: '*/*'}), async function (req, res, next) {
  let sum;
  try{
    sum = await processTree.process(req.body);
    } catch(err) {
      var err = new Error('Invalid input');
      err.status = 400;
      res.send('Invalid input');
    }
    res.send(sum + '');
})

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;

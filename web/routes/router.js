var express = require('express');
var router = express.Router();

var path = require('path');

// GET /
router.get('/', function(req, res, next) {
  console.log(__dirname);
  return res.sendFile(path.join(__dirname + '/../templates/login/index.html'));
});

router.get('/signup',function(req, res, next) {
  return res.sendFile(path.join(__dirname + '/../templates/signup/index.html'));
});


module.exports = router;
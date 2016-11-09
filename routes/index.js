var $express = require('express');
var router = $express.Router();
var indexDao = require('../dao/indexDao');
var middleware = require('../util/middleware');
var util = require('../util/util');
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  return indexDao.login(req, res, next);
});

router.post('/logout', function(req, res, next) {
  req.session.user_id = 0;
  req.session.privilege = 0;
  return util.write(res, true);
});

router.get('/checkUserLogin', middleware.checkUserLogin, function(req, res, next) {
  var result = {user_id: req.session.user_id, privilege: req.session.privilege};
  return util.write(res, result);
});

router.post('/clock', middleware.checkUserLogin, function(req, res, next) {
  return indexDao.clock(req, res, next);
});


module.exports = router;

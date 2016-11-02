var $express = require('express');
var router = $express.Router();
var indexDao = require('../dao/indexDao');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  indexDao.login(req, res, next);
});

/* router.get('/test', function(req, res, next) {
  indexDao.test2(req, res, next);
}); */

module.exports = router;

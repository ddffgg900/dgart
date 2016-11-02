var express = require('express');
var router = express.Router();
var controlDao = require('../dao/controlDao');


router.post('/checkLogin', function(req, res, next) {
  controlDao.checkLogin(req, res, next);
});

router.get('/listMission', function(req, res, next) {
  controlDao.listMission(req, res, next);
});
router.post('/addMission', function(req, res, next) {
  controlDao.addMission(req, res, next);
});
router.post('/missionUploadFile', function(req, res, next) {
  controlDao.uploadFile(req, res, next, "mission");
});
router.post('/tutorialUploadFile', function(req, res, next) {
  controlDao.uploadFile(req, res, next, "tutorial");
});
router.post('/addTutorial', function(req, res, next) {
  controlDao.addTutorial(req, res, next);
});
router.get('/showTutorial', function(req, res, next) {
  controlDao.showTutorial(req, res, next);
});
router.get('/listTutorial', function(req, res, next) {
  controlDao.listTutorial(req, res, next);
});

router.get('/listNewWork', function(req, res, next) {
  controlDao.listNewWork(req, res, next);
});
router.get('/listPastWork', function(req, res, next) {
  controlDao.listPastWork(req, res, next);
});
router.post('/addRating', function(req, res, next) {
  controlDao.addRating(req, res, next);
});
router.get('/listUser', function(req, res, next) {
  controlDao.listUser(req, res, next);
});
router.get('/listUserMission', function(req, res, next) {
  controlDao.listUserMission(req, res, next);
});
router.post('/setMissionLine', function(req, res, next) {
  controlDao.setMissionLine(req, res, next);
});




module.exports = router;

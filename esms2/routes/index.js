var express = require('express');
var router = express.Router();
const {create ,getAllUsers ,getAllteams } = require ('../controlers/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Express' });
});
router.get('/inscription', function(req, res, next) {
  res.render('regestration', { title: 'Express' });
});
router.post('/inscription', create);
router.get('/users', getAllUsers);
router.get('/teams', getAllteams);
module.exports = router;

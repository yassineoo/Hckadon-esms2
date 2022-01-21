var express = require('express');
var router = express.Router();
const {create ,getAllUsers ,getAllteams } = require ('../controlers/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {message: 'Express' });
});
router.get('/1', function(req, res, next) {
  res.render('index');
});
router.get('/inscription', function(req, res, next) {
  res.render('regestration', { message: '' });
});
router.post('/inscription', create);

router.get('/users', getAllUsers);
router.get('/teams', getAllteams);
module.exports = router;

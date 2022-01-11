var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Express' });
});
router.get('/inscription', function(req, res, next) {
  res.render('regestration', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
const {create } = require ('../controlers/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { title: 'Express' });
});
router.get('/inscription', function(req, res, next) {
  res.render('regestration', { title: 'Express' });
});

module.exports = router;

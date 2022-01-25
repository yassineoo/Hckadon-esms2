var express = require('express');
var router = express.Router();
const {create ,getAllUsers ,getAllteams,getLogin,auth,login, contact } = require ('../controlers/index.js');

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

router.get('/users',auth, getAllUsers);
router.get('/teams', getAllteams);
router.get('/login',getLogin);
router.post('/login',login);
router.post('/',contact)
module.exports = router;

var express = require('express');
var router = express.Router();

const {getAll } = require ('../controlers/index.js');

/* GET users listing. */
router.get('/', getAll);

module.exports = router;

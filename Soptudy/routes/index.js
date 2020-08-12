var express = require('express');
var router = express.Router();

//스터디
router.use('/study',require('./study'))

/* GET home page. */
module.exports = router;
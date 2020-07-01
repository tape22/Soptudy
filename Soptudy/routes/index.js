var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/main',require('./main/index'))
router.use('/register',require('./register/index'))
router.use('/apply',require('./apply/index'))
module.exports = router;

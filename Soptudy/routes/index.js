var express = require('express');
const studyContoller = require('../controllers/studyController');
const { routes } = require('../app');
var router = express.Router();


router.use('./study', require('./study'));


module.exports = router;

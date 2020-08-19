var express = require('express')
const studyContoller = require('../controllers/studyController');
const { routes } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '솝터디' });
});

router.get('/opened.ejs', function (req, res, next) {
  res.render('opened', { title: '스터디 개설하기' });
});


module.exports = router;


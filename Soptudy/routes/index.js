var express = require('express');
const studyContoller = require('../controllers/studyController');
const { routes } = require('../app');
var router = express.Router();

// router.use('./study', require('./study'));
/* GET home page. */
router.get('/', function (req, res, next) {
  /* 더미 데이터 만들어서  */
  const dum = [{ icon: '🙋‍♂️', category: '개발', title: '개발함냐함냐', name: '김채원' }];
  res.render('index', { dum: dum });
});

router.get('/opened.ejs', function (req, res, next) {
  res.render('opened', { title: '스터디 개설하기' });
});

module.exports = router;

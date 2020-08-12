var express = require('express')
const studyContoller = require('../controllers/studyController')
var router = express.Router();


//전체, 태그별 스터디 조회 페이지
router.get('/home/:tagCode', studyContoller.getHome)

//스터디 등록 페이지
router.post('/register', studyContoller.register)

//스터디 신청 페이지
router.get('/apply/:studyIdx', studyContoller.getApply)
roudter.post('/apply', studyContoller.postApply)

//스터디 수정 페이지
router.get('/edit/:studyIdx', studyContoller.getEdit)
router.put('/edit/:studyIdx', studyContoller.putEdit)
router.post('/passwd/:studyIdx', studyContoller.passwd)

module.exports=router;
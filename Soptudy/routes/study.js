var express = require('express')
const studyContoller = require('../controllers/studyController')
var router = express.Router();



//전체, 카테고리별 스터디 조회 페이지
router.get('/:category', studyContoller.getStudies)

//스터디 등록
router.post('/register', studyContoller.registerStudy)

//스터디 상세 정보 조회
router.get('/detail/:studyId', studyContoller.getStudyDetail)

//특정 스터디 신청
router.post('/apply', studyContoller.applyStudy)

//스터디 정보 수정
router.put('/edit/:studyId', studyContoller.editStudy)

//스터디 비밀번호 확인
router.post('/password', studyContoller.checkPassword)


module.exports = router;
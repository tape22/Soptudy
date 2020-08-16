const userModel = require('../models/user');
const studyModel = require('../models/study');
const encrypt = require('../modules/crypto');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const OPEN_STUDY = true;
const CLOSE_STUDY = false;

const study = {
    //분야별 스터디 조회 
    //0-전체, 1-기획, 2-디자인, 3-서버, 4-안드로이드, 5-ios, 6-웹
    getStudyByCategory: async (req, res) => {
        const category = req.params.category;
        let studiesInfo;
        try {
            if (category != 0) {
                studiesInfo = await studyModel.searchStudyByCategory(category);
            } else {
                studiesInfo = await studyModel.searchStudyAll();
            }
            return res.status(statusCode.OK).json(util.success(statusCode.OK,resMessage.STUDY_CATEGORY_SUCCESS,studiesInfo));
        } catch (err) {
            console.log('getStudyByCategory Err: ', err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.SERVER_ERROR));
        }
    },

    //스터디 등록
    registerStudy: async (req, res) => {
        const { icon, category, leaderName, leaderPhoneNumber, leaderPart, title, intro, content, schedule, location, headCount, password } = req.body;
        try {
            if ( !icon || !category || !leaderName || !leaderPhoneNumber || !leaderPart || !title || !intro || !content || !schedule || !location || !headCount || !password ) {
                console.log('registerStudy: null value');
                return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
            }

            let user = await userModel.findUser(leaderPhoneNumber);
            if (!user) {
                user = await userModel.addUser({
                    name : leaderName,
                    phoneNumber: leaderPhoneNumber,
                    part: leaderPart
                });
            }

            const { salt, hashed } = await encrypt.encrypt(password);
            await studyModel.addStudy({ icon, category, leader: user._id, title, intro, content, schedule, location, headCount, password: hashed, salt: salt, status: OPEN_STUDY });
            
            return res.status(statusCode.OK).json(util.success(statusCode.OK,resMessage.STUDY_REGISTER_SUCCESS));
        } catch (err) {
            console.log('registerStudy Err: ', err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.SERVER_ERROR));
        }
    },

    //특정 스터디 정보 조회
    getStudyDetail: async (req, res) => {
        const studyId = req.params.studyId;
        try {
            const studyInfo = await studyModel.searchStudyDetail(studyId);
            return res.status(statusCode.OK).json(util.success(statusCode.OK,resMessage.STUDY_DETAIL_SUCCESS,studyInfo));
        } catch (err) {
            console.log('getApply Err: ', err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.SERVER_ERROR));
        }
    },


    //특정 스터디 신청
    applyStudy: async (req, res) => {
        const { studyId, name, phoneNumber, part } = req.body;

        try {
            if ( !studyId || !name || !phoneNumber ) {
                console.log('applyStudy: null value');
                return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
            }

            let user = await userModel.findUser(phoneNumber);
            if (!user) {
                user = await userModel.addUser({
                    name,
                    phoneNumber,
                    part,
                    bound
                });
            }

            const isExistMember = await studyModel.findMember(studyId, user._id);
            if (isExistMember !== null) {
                return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST,resMessage.STUDY_APPLY_FAIL));
            }

            await studyModel.addMember(studyId, user._id)

            if( await studyModel.isfullHeadCount(studyId) === true ){
                await studyModel.modifyStudyStatus(studyId,CLOSE_STUDY);
            }

            return res.status(statusCode.OK).json(util.success(statusCode.OK,resMessage.STUDY_APPLY_SUCCESS));

        } catch (err) {
            console.log('applyStudy Err : ', err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.SERVER_ERROR));
        }
    },

    //스터디 정보 수정
    editStudy: async (req, res) => {
        const studyId = req.params.studyId;
        const { icon, category, leaderName, leaderPhoneNumber, leaderPart, title, intro, content, schedule, location, headCount } = req.body;
        try {
            if ( !icon || !category || !leaderName || !leaderPhoneNumber || !leaderPart || !title || !intro || !content || !schedule || !location || !headCount ) {
                console.log('editStudy: null value');
                return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
            }

            let user = await userModel.findUser(leaderPhoneNumber);
            if (!user) {
                user = await userModel.addUser({
                    name : leaderName,
                    phoneNumber: leaderPhoneNumber,
                    part: leaderPart
                });
            }

            await studyModel.modifyStudy(studyId, {icon, category, leader: user._id, title, intro, content, schedule, location, headCount})

            if( await studyModel.isfullHeadCount(studyId) === true ){
                await studyModel.modifyStudyStatus(studyId,CLOSE_STUDY);
            }else{
                await studyModel.modifyStudyStatus(studyId,OPEN_STUDY);
            } //result data에는 update된 status 반영안됨.

            return res.status(statusCode.OK).json(util.success(statusCode.OK,resMessage.STUDY_EDIT_SUCCESS));

        } catch (err) {
            console.log('editStudy Err: ', err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.SERVER_ERROR));
        }
    },

    //스터디 비밀번호 확인
    checkPassword: async (req, res) => {
        const {studyId, password} = req.body;
        try {
            const result = await studyModel.checkPassword(studyId, password);

            if (result === false) {
                return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
            } else {
                return res.status(statusCode.OK).json(util.success(statusCode.OK,resMessage.PASSWORD_CHECK_SUCCESS));
            }
        } catch (err) {
            console.log('checkPassword Err: ', err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.SERVER_ERROR));
        }
    }
}

module.exports = study
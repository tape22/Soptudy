const userModel = require('../models/user');
const studyModel = require('../models/study');
const { isfullHeadCount } = require('../models/study');
const OPEN_STUDY = true;
const CLOSE_STUDY = false;

const study = {
    // home : 전체-0, 분야별-1,2,3,4,5 스터디 조회
    getStudies: async (req, res) => {
        const category = req.params.category;
        let studyInfo;
        try {
            if (category != 0) {
                studyInfo = await studyModel.searchStudy(category);
            } else {
                studyInfo = await studyModel.searchAllStudy();
            }

            return res.status(200).json({
                message: "Success",
                data: studyInfo
            });

        } catch (err) {
            console.log('getStudies Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    },

    //registerStudy: 스터디 등록
    registerStudy: async (req, res) => {
        const {
            icon,
            category,
            leaderName,
            leaderPhoneNumber,
            leaderPart,
            title,
            intro,
            content,
            schedule,
            location,
            headCount,
            password
        } = req.body;
        try {
            if (!icon || !category || !leaderName || !leaderPhoneNumber || !leaderPart || !title || !intro || !content || !schedule || !location || !headCount || !password) {
                console.log('registerStudy: missing required value');
                return res.status(400).json({
                    message: "Missing required value"
                });
            }

            let user = await userModel.findUser(leaderPhoneNumber);
            if (!user) {
                user = await userModel.addUser({
                    name : leaderName,
                    phoneNumber: leaderPhoneNumber,
                    part: leaderPart
                });
            }

            const result = await studyModel.addStudy({
                icon,
                category,
                leader: user._id,
                title,
                intro,
                content,
                schedule,
                location,
                headCount,
                password,
                status: true
            })

            return res.status(200).json({
                message: "Success",
                data: result
            });

        } catch (err) {
            console.log('registerStudy Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    },

    // getStudyDetail: 특정 스터디 정보 조회  (파람필요)
    getStudyDetail: async (req, res) => {
        const studyId = req.params.studyId;
        try {
            const result = await studyModel.getOneStudy(studyId);
            return res.status(200).json({
                message: "Success",
                data: result
            });
        } catch (err) {
            console.log('getApply Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    },


    // applyStudy: 특정 스터디 신청
    applyStudy: async (req, res) => {
        const {
            studyId,
            name,
            phoneNumber,
            part,
            bound,
        } = req.body;

        try {
            if (!studyId || !name || !phoneNumber) {
                console.log('applyStudy: Missing required value');
                return res.status(400).json({
                    message: "Missing required value"
                });
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
                return res.status(400).json({
                    message: 'Already applied member'
                });
            }

            const result = await studyModel.addMember(studyId, user._id)

            if( await studyModel.isfullHeadCount(studyId) === true ){
                await studyModel.modifyStudyStatus(studyId,CLOSE_STUDY);
            }//result data에는 update된 status 반영안됨. 

            return res.status(200).json({
                message: "Success",
                data: result
            });
        } catch (err) {
            console.log('applyStudy Err : ', err)
            return res.status(500).json({
                message: "Server Error",
                err: err
            })
        }
    },

    //editStudyDetail: 특정 스터디 정보 수정 (파람 필요)
    editStudyDetail: async (req, res) => {
        const studyId = req.params.studyId;
        const {
            icon,
            category,
            leaderName,
            leaderPhoneNumber,
            leaderPart,
            title,
            intro,
            content,
            schedule,
            location,
            headCount
        } = req.body;

        try {
            if (!icon || !category || !leaderName || !leaderPhoneNumber || !leaderPart || !title || !intro || !content || !schedule || !location || !headCount) {
                console.log('editStudyDetail: missing required value');
                return res.status(400).json({
                    message: "Missing required value"
                });
            }

            let user = await userModel.findUser(leaderPhoneNumber);
            if (!user) {
                user = await userModel.addUser({
                    name : leaderName,
                    phoneNumber: leaderPhoneNumber,
                    part: leaderPart
                });
            }

            const result = await studyModel.modifyStudy(studyId,{
                icon,
                category,
                leader: user._id,
                title,
                intro,
                content,
                schedule,
                location,
                headCount
            })

            if( await studyModel.isfullHeadCount(studyId) === true ){
                await studyModel.modifyStudyStatus(studyId,CLOSE_STUDY);
            }else{
                await studyModel.modifyStudyStatus(studyId,OPEN_STUDY);
            } //result data에는 update된 status 반영안됨.

            return res.status(200).json({
                message: "Success",
                data: result
            });

        } catch (err) {
            console.log('editStudyDetail Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    },

    //checkPassword: 특정스터디 비밀번호 확인
    checkPassword: async (req, res) => {
        const {
            studyId,
            password
        } = req.body;
        try {
            const result = await studyModel.checkPassword(studyId, password);

            if (result === false) {
                return res.status(400).json({
                    message: "fail"
                });
            } else {
                return res.status(200).json({
                    message: "Success"
                });
            }
        } catch (err) {
            console.log('checkPassword Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    }
}

module.exports = study
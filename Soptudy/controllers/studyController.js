const userModel = require('../models/user');
const studyModel = require('../models/study')

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

            console.log(studyInfo);



            return res.status(200).json({
                message: "Success",
                data: studyInfo
            });

        } catch (err) {
            console.log('home Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    },

    //registerStudy: 스터디 등록
    //registerStudy: async (req, res) => {
    //     const {}= req.body;
    //     try {
    //         const result = await studyModel.addStudy(req.body)
    //         res.status(200).send(result);
    //     } catch (err) {
    //         res.status(500).send(err)
    //     }
    // },

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
                console.log('postApply null value');
                return res.status(400).json({
                    message: "Required: studyId, name, phoneNumber"
                });
            }

            let user = await userModel.findUser(phoneNumber);
            if (!user) {
                user = await userModel.addUser({studyId,name,phoneNumber,part,bound});
            }

            const isExistMember =  await studyModel.findMember(studyId,user._id);
            if(isExistMember !== null){
                return res.status(400).json({
                    message: '이미 등록된 멤버입니다.'
                });
            }

            const result = await studyModel.addMember(studyId, user._id)
            return res.status(200).json({
                message: "Success",
                data: result
            });

        } catch (err) {
            console.log('postApply Err : ', err)
            return res.status(500).json({
                message: "Server Error",
                err: err
            })
        }
    },

    //editStudyDetail: 특정 스터디 정보 수정 (파람 필요)

    //checkPassword: 특정스터디 비밀번호 확인
    checkPassword: async (req,res) => {
        const { studyId, password }= req.body;
        try {
            const result = await studyModel.checkPassword(studyId,password);

            if( result === false ){
                return res.status(400).json({
                    message: "fail"
                });
            }else{
                return res.status(200).json({
                    message: "Success"
                });
            }
        } catch (err) {
            console.log('password Err: ', err);
            return res.status(500).json({
                message: "Server Error",
                err: err
            });
        }
    }
}

module.exports = study
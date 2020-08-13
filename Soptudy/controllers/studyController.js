const userModel = require('../models/user');
const studyModel = require('../models/study')

const study = {
    // home : 전체-0, 분야별-1,2,3,4,5 스터디 조회
    home: async (req, res) => {
        const categoryIdx = req.params.categoryIdx;
        let result;
        try {
            if (categoryIdx != 0)
                result = await studyModel.searchStudy(categoryIdx)
            else
                result = await studyModel.searchAllStudy()
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err)
        }
    },

    // //register: 스터디 등록
    // register: async (req, res) => {
    //     try {
    //         const result = await studyModel.addStudy(req.body)
    //         res.status(200).send(result);
    //     } catch (err) {
    //         res.status(500).send(err)
    //     }
    // },

    // getApply: 특정 스터디 정보 조회  (파람필요)


    // postApply: 특정 스터디 신청 (파람필요)
    postApply: async (req, res) => {
        const studyId = req.body.studyId;
        const contact = req.body.contact;
        let userId;
        try {
            const user = await userModel.findUser(contact);
            //유저가 없는 경우 add후 해당 유저의 id값 반환
            if (user != null) {
                userId = user._id
            } else { 
                const result = await userModel.addUser(req.body);
                userId = result._id
            }
        } catch (err) {
            res.status(500).send(err);
        }

        try {
            const result = await studyModel.addMember(studyId,userId)
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(err)
        }
    },

    // getEdit: 특정 스터디 정보 조회(비밀번호 포함) (파람 필요)

    // putEdit: 특정 스터디 정보 수정 (파람 필요)

    // passwd: 특정스터디 비밀번호 확인 (파람필요)

}

module.exports = study
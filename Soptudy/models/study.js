const User = require('../schemas/user')
const Study = require('../schemas/study')
const encrypt = require('../modules/crypto');
const ObjectId = require('mongoose').Types.ObjectId

const study = {
    addStudy: async (studyInfo) => {
        try {
            const study = new Study(studyInfo);
            return study.save();
        } catch (err) {
            console.log('addStudy Err');
            throw err;
        }
    },
    modifyStudy: async (studyId,modifiedStudyInfo) => {
        try {
            return Study.findOneAndUpdate({
                _id: studyId
            }, 
                modifiedStudyInfo
            , {
                new: true
            });
        } catch (err) {
            console.log('modifyStudy Err');
            throw err;
        }
    },
    searchStudyDetail: async (studyId) => {
        try {
            const studies = await Study.aggregate([{
                    $project: {
                        _id: 1,
                        icon: 1,
                        headCount: 1,
                        category: 1,
                        title: 1,
                        intro: 1,
                        content: 1,
                        leader: 1,
                        status: 1,
                        members: 1,
                        schedule: 1,
                        location: 1,
                        memberCount: {
                            $size: "$members"
                        }
                    }
                },
                {
                    $match: {
                        _id: ObjectId(studyId)
                    }
                }
            ]);

            await User.populate(studies, [{
                path: "leader",
                select: {
                    _id: 0,
                    name: 1,
                    phoneNumber: 1,
                    part: 1
                }
            }, {
                path: "members",
            }]);

            return studies[0];


        } catch (err) {
            console.log('searchStudyDetail Err');
            throw err;
        }
    },
    searchStudyByCategory: async (category) => {
        try {
            const studies = await Study.aggregate([{
                    $project: {
                        _id: 1,
                        icon: 1,
                        headCount: 1,
                        category: 1,
                        title: 1,
                        leader: 1,
                        status: 1,
                        memberCount: {
                            $size: "$members"
                        }
                    }
                },
                {
                    $match: {
                        category: Number(category)
                    }
                }
            ]);

            await User.populate(studies, {
                path: "leader",
                select: {
                    _id: 0,
                    name: 1
                }
            });

            return studies;

        } catch (err) {
            console.log('searchStudyByCategory Err')
            throw err;
        }
    },
    searchStudyAll: async () => {
        try {
            const studies = await Study.aggregate([{
                $project: {
                    _id: 1,
                    icon: 1,
                    headCount: 1,
                    category: 1,
                    title: 1,
                    leader: 1,
                    status: 1,
                    memberCount: {
                        $size: "$members"
                    }
                }
            }]);

            await User.populate(studies, {
                path: "leader",
                select: {
                    _id: 0,
                    name: 1
                }
            });

            return studies;

        } catch (err) {
            console.log('searchStudyAll Err')
            throw err;
        }
    },
    addMember: async (studyId, userId) => {
        try {
            return Study.findOneAndUpdate({
                _id: studyId
            }, {
                $push: {
                    members: userId
                }
            }, {
                new: true
            })
        } catch (err) {
            console.log('addMember Err')
            throw err;
        }
    },
    findMember: async (studyId, userId) => {
        try {
            return Study.findOne({
                members: userId,
                _id: studyId
            });
        } catch (err) {
            console.log('findMember Err');
            throw err;
        }
    },
    checkPassword: async (studyId, password) => {
        try {
            const study = await Study.findOne({
                _id: studyId
            }, {
                _id: 0,
                password: 1,
                salt: 1
            });

            const hashedPassword = await encrypt.encryptWithSalt(password, study.salt);

            if ( hashedPassword === study.password ) {
                return true
            } else {
                return false
            }

        } catch (err) {
            console.log('checkPasswd Err');
            throw err;
        }
    },
    isfullHeadCount: async (studyId) => {
        try {
            const result = await Study.aggregate([{
                $project: {
                    headCount:1,
                    memberCount: {
                        $size: "$members"
                    }
                }
            }, {
                $match: {
                    _id: ObjectId(studyId)
                }
            }]);

            if(result[0].memberCount >= result[0].headCount){
                return true;
            }else{
                return false;
            }

        } catch (err) {
            console.log('searchStudyAll Err')
            throw err;
        }

    },
    modifyStudyStatus: async (studyId,modifiedStatus) => {
        try {
            return Study.findOneAndUpdate({
                _id: studyId
            }, {
                status: Boolean(modifiedStatus)
            }, {
                new: true
            });
        } catch (err) {
            console.log('closeStudy Err');
            throw err;
        }
    }
}

module.exports = study
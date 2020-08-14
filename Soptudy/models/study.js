const User = require('../schemas/user')
const Study = require('../schemas/study')

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
    getOneStudy: async (studyId) => {
        try {
            return Study.findOne({
                _id: studyId
            }, {
                password: false
            }).populate('owner').populate('members');
        } catch (err) {
            console.log('getOneStudy Err');
            throw err;
        }
    },
    searchStudy: async (category) => {
        try {
            /*return Study.find({
                category: categoryIdx
            },{_id: true, icon: true, headCount: true, category: true, title: true}).populate('owner','name');*/

            const studies = await Study.aggregate([{
                    $project: {
                        _id: 1,
                        icon: 1,
                        headCount: 1,
                        category: 1,
                        title: 1,
                        owner: 1,
                        memberCount: {
                            $size: "$members"
                        }
                    }
                },
                {
                    $match:{
                        category: Number(category)
                    }
                }
            ]);

            await User.populate(studies, {
                path: "owner",
                select: {
                    _id: 0,
                    name: 1
                }
            });

            return studies;

        } catch (err) {
            console.log('searchStudy Err')
            throw err;
        }
    },
    searchAllStudy: async () => {
        try {
            const studies = await Study.aggregate([{
                $project: {
                    _id: 1,
                    icon: 1,
                    headCount: 1,
                    category: 1,
                    title: 1,
                    owner: 1,
                    memberCount: {
                        $size: "$members"
                    }
                }
            }
        ]);

        await User.populate(studies, {
            path: "owner",
            select: {
                _id: 0,
                name: 1
            }
        });
        return studies;

        } catch (err) {
            console.log('searchAllStudy Err')
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
            const result = await Study.findOne({
                _id: studyId
            }, {
                _id: 0,
                password: 1
            });
            console.log(result.password)
            if (result.password === password) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.log('getPasswd Err');
            throw err;
        }
    }
}

module.exports = study
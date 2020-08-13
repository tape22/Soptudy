const User = require('../schemas/user')
const Study = require('../schemas/study')

const study = {
    addStudy: (studyInfo) => {
        const study = new Study(studyInfo);
        return study.save();
    },
    getOneStudy: (studyId) => {
        return Study.findOne({
            _id: studyId
        });
    },
    searchStudy: (categoryIdx) => {
        return Study.find({
            category: categoryIdx
        });
    },
    searchAllStudy: () => {
        return Study.find({});
    },
    addMember: (studyId,userId) => {
        return Study.findOneAndUpdate({ _id: studyId }, { $push: { members: userId }}, { new: true })
    }
}

module.exports = study
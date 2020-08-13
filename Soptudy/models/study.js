const User = require('../schemas/user')
const Study = require('../schemas/study')

const study = {
    addStudy: async (studyInfo) => {
        const study = new Study(studyInfo);
        const result = await study.save();
        return result;
    }
}

module.exports = study
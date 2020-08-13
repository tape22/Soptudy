const User = require('../schemas/user')

const user = {
    //연락처로 유저가 존재하는지 확인
    findUser: (contact) => {
        return User.findOne({contact});
    },
    //유저 추가
    addUser: (userInfo) => {
        const user = new User(userInfo);
        return user.save();
    }
}

module.exports = user;
const User = require('../schemas/user')

const user = {
    findUser: async (phoneNumber) => {
        try {
            return User.findOne({
                phoneNumber
            });
        } catch (err) {
            console.log('findUser Err')
            throw err;
        }
    },
    addUser: async (userInfo) => {
        try {
            const user = new User(userInfo);
            return user.save();
        } catch (err) {
            console.log('addUser Error');
            throw err;
        }
    }
}

module.exports = user;
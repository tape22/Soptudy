const mongoose = require('mongoose')

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV != 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect('mongodb+srv://soptudy:soptudy4ever@cluster0.mppl5.mongodb.net/admin?retryWrites=true&w=majority', {
            dbName: 'soptudy',
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결에러', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });

    require('./user');
    require('./study');
};
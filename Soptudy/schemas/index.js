const mongoose = require('mongoose');
const db = require('../config/dbInfo.json');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV != 'production') {
            mongoose.set('debug', true)
        }
        mongoose.set('useCreateIndex', true);
        mongoose.connect(db.host, {useNewUrlParser:true, useUnifiedTopology: true}, (error) => {
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

    require('./study');
};
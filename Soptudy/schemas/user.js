const mongoose = require('mongoose')

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
    },
    part:{
        type: String,
        required: true,
    },
    bound: Number,
},{
    versionKey: false
});

module.exports = mongoose.model('User',userSchema)
const mongoose = require('mongoose')

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contact:{
        type: String,
        required: true,
        unique: true,
    },
    part: String,
    bound: Number,
},{
    versionKey: false
});

module.exports = mongoose.model('User',userSchema)
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: {ObjectId}} = Schema;
const studySchema = new Schema({
    icon:{
        type: String,
        required : true,
    },
    title:{
        type: String,
        required: true,
    },
    category:{
        type: Number,
        required: true,
    },
    headCount:{
        type:Number,
        required:true,
    },
    startDate:{
        type: Date,
        required:true,
    },
    endDate:{
        type: Date,
        required:true,
    },
    intro:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    owner:{
        type: ObjectId,
        required: true,
        ref:'user',s
    },
    password:{
        type: String,
        required: true,       
    },
    members:[{
        type:ObjectId,
        ref:'user',
    }],
    status:{
        type: Number,
        required:true
    },
});

module.exports = mongoose.model('study',studySchema);
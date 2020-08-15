const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: {ObjectId}} = Schema;
const studySchema = new Schema({
    icon:{
        type: String,
        required : true,
    },
    category:{
        type: Number,
        required: true,
    },
    leader:{
        type: ObjectId,
        required: true,
        ref:'User',
    },
    title:{
        type: String,
        required: true,
    },
    intro:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    schedule:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    headCount:{
        type:Number,
        required:true,
    },
    password:{
        type: String,
        required: true,       
    },
    status:{
        type: Boolean,
        required:true,
    }, 
    members:[{
        type:ObjectId,
        ref:'User',
    }],
},{
    versionKey: false
});

module.exports = mongoose.model('Study',studySchema);
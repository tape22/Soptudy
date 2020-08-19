const mongoose = require('mongoose');

const {
    Schema
} = mongoose;
const {
    Types: {
        ObjectId
    }
} = Schema;
const studySchema = new Schema({
    icon: {
        type: String,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    headCount: {
        type: Number,
        required: true,
    },
    leaderName: {
        type: String,
        required: true,
    },
    leaderPhoneNumber: {
        type: String,
        required: true,
    },
    leaderPart: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    members: [{
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        part: {
            type: String,
            required: true,
        }
    }],
}, {
    versionKey: false
});

module.exports = mongoose.model('Study', studySchema);
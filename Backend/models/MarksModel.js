const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        classId: {
            type: String,
            required: true,
        },
        test1: {
            type: Number,
            default: 0,
            min: 0,
        },
        test2: {
            type: Number,
            default: 0,
            min: 0,
        },
        endSem: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        collection: 'marks',
        timestamps: true,
    }
);

module.exports = mongoose.model('Marks', marksSchema);

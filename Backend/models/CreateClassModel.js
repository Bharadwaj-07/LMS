const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        required: true,
        trim: true,
    },
    subjectName: {
        type: String,
        required: true,
        trim: true,
    },
    instructorName: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'classRooms',
});

module.exports = mongoose.model('Class', classSchema);

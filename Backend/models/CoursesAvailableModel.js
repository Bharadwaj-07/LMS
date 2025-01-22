const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    instructor: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}, {
    collection: 'coursesAvailable',
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

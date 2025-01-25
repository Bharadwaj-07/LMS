const mongoose = require('mongoose')
const SchemaCourse = new mongoose.Schema({
    courseCode: {
        type: String,
        required: [true, "Course Code missing"],
        unique: true,  // Custom error message for validation
    },
    courseName: {
        type: String,
        required: [true, "Course Name missing"],
        unique: true,
    },
    instructors: {
        type: Array,
        required: [true, "Instructor missing"],
    },
    credits: {
        type: Number,
        required: [true, "Credits value missing"],
        min: 1
    },
    description: {
        type: String,
    },
    department: {
        type: String,
        required: [true, "Department missing"]
    },
    students: {
        type: Array,
    }
});

// Create the model based on the schema
module.exports = mongoose.model('courses', SchemaCourse);




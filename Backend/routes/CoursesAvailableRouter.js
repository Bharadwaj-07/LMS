const express = require('express');
const Course = require('../models/CoursesAvailableModel')

const router = express.Router();

console.log("router")
router.post('/', async (req, res) => {
    console.log('POST /coursesAvailable');
    const { courseId, instructor, subject } = req.body;

    try {
        const newCourse = new Course({ courseId, instructor, subject });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (err) {
        res.status(400).json({ message: 'Error creating course', error: err.message });
    }
});

router.get('/', async (req, res) => {
    console.log('GET /coursesAvailable');
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
});

module.exports = router;

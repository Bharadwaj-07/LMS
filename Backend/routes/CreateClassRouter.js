const express = require('express');
const Class = require('../models/CreateClassModel');
const Course = require('../models/CoursesAvailableModel');

const router = express.Router();

router.post('/', async (req, res) => {
    const { className, subjectName, instructorName } = req.body;

    if (!className || !subjectName || !instructorName) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        const newClass = new Class({
            className,
            subjectName,
            instructorName,
        });

        const savedClass = await newClass.save();

        const newCourse = new Course({
            courseId: savedClass._id,
            instructor: instructorName,
            subject: subjectName,
        });

        const savedCourse = await newCourse.save();

        res.status(201).json({
            message: 'Class and Course created successfully',
            class: savedClass,
            course: savedCourse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
});

module.exports = router;

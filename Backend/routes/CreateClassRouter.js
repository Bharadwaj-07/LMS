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

router.delete('/:id', async (req, res) => {
    const classId = req.params.id;
    console.log(classId)

    try {
        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }
        const deletedCourse = await Course.findOneAndDelete({ courseId: classId });

        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({
            message: 'Class and Course deleted successfully',
            class: deletedClass,
            course: deletedCourse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

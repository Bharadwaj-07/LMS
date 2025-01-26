const express = require('express');
const Class = require('../models/CreateClassModel');
const Course = require('../models/CoursesAvailableModel');
const Admin = require('../models/Admins');
const JoinClass = require('../models/JoinClassModel');
const router = express.Router();
const CourseModel = require('../models/Course');
router.post('/', async (req, res) => {
    let { className, subjectName, instructorName, userId } = req.body;
    console.log(req.body);
    if (!className || !subjectName || !instructorName || !userId) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    userId = userId.toLowerCase();
    console.log("User", userId);
    try {
        const newClass = new Class({
            className,
            subjectName,
            instructorName,
            userId
        });
        const admin = new Admin({
            course: className,
            Admins: [userId]
        });
        const course = new CourseModel({
            courseCode: className,
            courseName: subjectName,
            instructors: [instructorName],
            students: []
        });
        const saveCourse = await course.save();
        const savedClass = await newClass.save();
        const savedAdmin = await admin.save();

        const newCourse = new Course({
            classId: className, 
            instructor: instructorName,
            subject: subjectName,
            userId
        });

        const savedCourse = await newCourse.save();

        res.status(201).json({
            message: 'Class and Course created successfully',
            class: savedClass,
            course: savedCourse,
        });
    }
    catch (error) {
        console.log("error");
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/user', async (req, res) => {
    let userId = req.body.userId;
    userId = userId.toLowerCase();
    console.log("user fetching", userId)
    try {
        const classes = await Class.find({ userId: userId });
        console.log("Classes",classes);
        const joinClasses = await JoinClass.find({ userId: userId })
            .populate('classId', 'classId')
            .select('classId');
        console.log("JoinClasses",joinClasses);
        const classIds = joinClasses.map(joinClass => joinClass.classId);

        console.log(classIds);
        let classId = ["CS 201"];

        const memberClasses = await Class.find({ className: { $in: classIds } });
        const mergedClasses = [...classes, ...memberClasses];
        console.log(memberClasses, "Members");
        res.status(200).json(mergedClasses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
});

router.delete('/:classId/:userId', async (req, res) => {
    const { classId, userId } = req.params;

    try {
        console.log('Params:', { classId, userId });

        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const deletedCourse = await Course.findOneAndDelete({ classId, userId });

        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({
            message: 'Class and Course deleted successfully',
            class: deletedClass,
            course: deletedCourse,
        });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;

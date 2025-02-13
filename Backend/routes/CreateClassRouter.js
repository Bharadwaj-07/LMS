const express = require('express');
const Class = require('../models/CreateClassModel');
const Course = require('../models/CoursesAvailableModel');
const Admin = require('../models/Admins');
const JoinClass = require('../models/JoinClassModel');
const marks=require('../models/MarksModel');
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

        const memberClasses = await Class.find({ className: { $in: classIds } });
        const mergedClasses = [...classes, ...memberClasses];
        console.log(memberClasses, "Members");
        res.status(200).json(mergedClasses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
});

router.delete('/:classId/:userId/:admin/:instructor', async (req, res) => {
    let { classId, userId, admin,instructor } = req.params;

    let deletedClasses = null;
    let deletedCourses = null;
    let deletedUsers = null;
    let deletedUserClasses = null;
    let deletedCourseModel=null;
    try {
        console.log("deleting");
        console.log('Params:', { classId, userId, admin ,instructor});

        // Convert admin to boolean
        const isAdmin = admin === 'true';

        if (isAdmin) {
            deletedClasses = await Class.findOneAndDelete({ className: classId });



            deletedCourses = await Course.findOneAndDelete({ classId: classId, instructor: instructor });


            deletedUsers = await JoinClass.deleteMany({ classId: classId });


            deletedCourseModel=await CourseModel.findOneAndDelete({classId:classId});

        } else {
            console.log(userId,classId);
            userId=userId.toLowerCase();
            deletedUserClasses = await JoinClass.findOneAndDelete({ userId: userId, classId: classId });


        }

        res.status(200).json({
            message: 'Deletion successful',
            deletedClasses: deletedClasses,
            deletedCourses: deletedCourses,
            deletedUsers: deletedUsers,
            deletedUserClasses: deletedUserClasses
        });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




module.exports = router;

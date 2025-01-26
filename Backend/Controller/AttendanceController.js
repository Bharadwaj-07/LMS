const res = require("express/lib/response")
const jwt = require("jsonwebtoken");
const Attendance = require("../models/Attendance");
const Admins = require("../models/Admins");
const Courses = require("../models/Course");
mongoose = require("mongoose");
require('dotenv').config();

exports.getDates = async (req, res) => {
    const { course } = req.body;
    try {
        const courseDetails = await Courses.findOne({ courseCode: course });
        console.log(courseDetails);
        const courseId = new mongoose.Types.ObjectId('6794f930d83cb1cfc2cb0cfa');
        console.log(courseId);
        const dates = await Attendance.find({ course: courseId });
        console.log(dates);
        return res.json(dates);
    }
    catch (e) {
        console.log(e);
    }
}
exports.checkAdmin = async (req, res) => {
    const course=req.body.course;
    const userId = req.body.user;
    console.log("body",req.body);
    try {
        const courseDetails = await Admins.findOne({ course: course });
        console.log(courseDetails);
        if (courseDetails.Admins.includes(userId)) {
            return res.json({ admin: true });
        }
    }
    catch (e) {
        console.log(e);
    }
    return res.json({ admin: false });
}
exports.getAttendance = async (req, res) => {
    const { date, course } = req.query;
    console.log("date", date);
    try {
        const courseId = new mongoose.Types.ObjectId('6794f930d83cb1cfc2cb0cfa');
        const Record = await Attendance.find({ date: date, course: courseId }).populate('attendance', 'name');
        if (Record.length == 0) {
            return res.status(400).json({ message: "No attendance found" });
        }
        const names = Record[0].attendance.map((item) => item.name);
        console.log(Record);
        return res.json(names);
    }
    catch (e) {
        console.log(e);
    }
}
exports.getUsers = async (req, res) => {
    const { course } = req.body;
    try {
        const users = await Courses.find({ course: course }).populate('students', 'name');
        const names = users.students.map((item) => item.name);
        console.log(names);
        return res.json(names);
    }
    catch (e) {
        console.log(e);
    }

}
exports.SetAttendance = async (req, res) => {
    const { date, course, attendance } = req.body;
    try {
        const Record = await Attendance.findOne({ date: date, course: course });
        if (Record) {
            await Attendance.findOneAndUpdate({ date: date, course: course }, { attendance: attendance });
        }
        const newRecord = new Attendance({
            date: date,
            course: course,
            attendance: attendance
        });
        await newRecord.save();
        return res.json({ message: "Attendance Marked" });
    }
    catch (e) {
        console.log(e);
    }
}
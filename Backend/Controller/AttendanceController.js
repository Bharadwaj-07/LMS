const res = require("express/lib/response")
const jwt = require("jsonwebtoken");
const Attendance = require("../models/Attendance");
const Admins = require("../models/Admins");
const Courses = require("../models/Course");
const Profile = require("../models/Profile");
mongoose = require("mongoose");
require('dotenv').config();

exports.getDates = async (req, res) => {
    const { course } = req.body;
    try {
        const dates = await Attendance.find({ course: course });
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
    console.log("date", req.query);
    try {
        const Record = await Attendance.find({ date: date, course: course }).populate('attendance');
        if (Record.length == 0) {
            return res.status(400).json({ message: "No attendance found" });
        }
        const userIds = Record[0].attendance.map((item) => item);
        console.log("UserIds", userIds);
        // Fetch user profiles for the given IDs using Promise.all
        const profiles = await Promise.all(userIds.map(async (id) => {
            const profile = await Profile.findById(id).select('name');
            return profile ? profile.name : null;
        }));

        console.log("Names:", profiles);
        
        // Return the list of names
        return res.json(profiles);
    }
    catch (e) {
        console.log(e);
    }
}
exports.getUsers = async (req, res) => {
    const { course } = req.body;
    console.log("Course at attendance", course);
    try {
        const users = await Courses.find({ courseCode: course }).populate('students', 'name');
        console.log("Users", users);

        // Extract the list of students
        const studentsList = users.flatMap(user => user.students); // Flatten to a single array
        console.log("Extracted Students:", studentsList);

        return res.json(studentsList);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};

exports.SetAttendance = async (req, res) => {
    const { date, course, attendance } = req.body;
    console.log("Date", date);
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
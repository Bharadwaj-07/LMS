const res = require("express/lib/response")
const Persons = require("../Models/Profile")
mongoose = require("mongoose");
exports.availability = async (req, res) => {

    let Name = req.body.Name;
    console.log("Name", Name);
    const fieldName = req.body.fieldName;
    console.log(req.body);
    console.log(Name, fieldName);
    Name = Name.toLowerCase();
    try {
        // const Person = await Persons.findOne({ fieldName:Uname });
        const Person = await Persons.findOne({ [fieldName]: Name });
        console.log(Person);
        console.log(fieldName, Name);
        if (Person) {
            return res.json({ available: false });
        }
        return res.json({ available: true });
    }
    catch (e) {

        console.log(e);
    }
}
exports.login = async (req, res) => {
    let { uname:Uname, passwd:password } = req.body;
    Uname = Uname.toLowerCase();
    try {
        const Person = await Persons.findOne({ "uname": Uname });
        if (Person) {
            if (Person.password === password) {
                return res.json({ verified: true });
            }
            else {
                return res.json({ verified: false });
            }
        }
        return res.json({ verified: false });
    }
    catch (e) {
        console.log(e);
        return res.json({ verified: false });

    }
}

exports.store = async (req, res) => {
    console.log("Request received:", req.body);
    let { Uname, password, Number, email, Age, College, Name,courses,DOB } = req.body;

    Uname = Uname.toLowerCase();
    email = email.toLowerCase();
    college = College.toLowerCase();
    const User = new Persons({
        uname: Uname,
        password: password,
        number: Number,
        email: email,
        age: Age,
        college: College,
        name: Name,
        courses:courses,
        DOB:DOB,
    });
    console.log({
        uname: Uname,
        password: password,
        number: Number,
        email: email,
        age: Age,
        college: College,
        name: Name,
    });
    try {
        console.log("Attempting to save user:", User);
        await User.save();
        console.log("User saved successfully");
        res.status(200).send({ message: "User details saved successfully" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send({ message: "Error saving user details", error: error.message });
    }
}
exports.getCourses = async (req, res) => {
    try {
        const courses = await Persons.findOne({uname:req.uname});
        res.status(200).send(courses);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error fetching courses", error: e.message });
    }
}
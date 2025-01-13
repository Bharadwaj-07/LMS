const res = require("express/lib/response")
const Persons = require("../Models/Profile")
mongoose=require("mongoose");
exports.availability = async (req, res) => {
    
    let { Uname } = req.body;
    try {
        const Person =await Persons.findOne({ Uname });
        if (Person) {
            return res.json({ available: false });
        }
        console.log("hello");
        return res.json({ available: true });
    }
    catch (e) {
        
        console.log(e);
    }
}
exports.login = async (req, res) => {
    const { Uname, password } = req.body;
    Uname = Uname.toLowerCase();
    try {
        const Person = Persons.findOne({ Uname });
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
    catch (e) { console.log(e); }
}
exports.store=async (req, res) => {
    console.log("reached");
    const{Uname,password,Number,email,Age,College}=req.body;
    const User=new Persons({
       Uname,
       password,
       Number,
       email,
       Age,
       College, 
    });
    try {
        await User.save();
        res.status(200).send({ message: 'User details saved successfully' });
      } catch (error) {
        res.status(500).send({ message: 'Error saving user details' });
      }
}
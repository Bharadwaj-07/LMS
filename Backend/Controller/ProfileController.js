const res = require("express/lib/response")
const Persons = require("../Models/Profile")

exports.availability = async (req, res) => {
    console.log("hello");
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
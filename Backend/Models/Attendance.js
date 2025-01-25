const mongoose = require('mongoose')
const Attendance = new mongoose.Schema({
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'courses'
    },
    attendance:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profiles'
    }]
});
module.exports = mongoose.model('Attendance', Attendance);
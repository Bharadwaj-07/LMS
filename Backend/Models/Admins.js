const { type } = require('express/lib/response');
const mongoose = require('mongoose')
const Admins = new mongoose.Schema({
    course:{
        type:String,
        ref:'courses'
    },
    Admins:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profiles'
    }]
});
module.exports = mongoose.model('Admins', Admins);
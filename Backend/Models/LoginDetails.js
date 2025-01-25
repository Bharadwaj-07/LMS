const mongoose=require('mongoose')
const LoginDetails = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },

});
module.exports = mongoose.model('LoginDetails', LoginDetails);
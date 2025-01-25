const mongoose = require('mongoose')
const LoginDetails = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        ref:"profiles"
    },
    Password: {
        type: String,
        required: true
    },

});
module.exports = mongoose.model('LoginDetails', LoginDetails);
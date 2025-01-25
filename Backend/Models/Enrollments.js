const mongoose = require('mongoose')
const SchemaCourse = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        ref: "LoginDetails",
        unique:true,
    },
    courses: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses"
    }]

});
module.exports = mongoose.model('RefreshToken', RefreshToken);
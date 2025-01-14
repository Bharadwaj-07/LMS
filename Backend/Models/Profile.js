const mongoose=require('mongoose')
const SchemaProfile = new mongoose.Schema({
    usingname: {
        type: String,
        required: [true, "Name is required"],
        unique: true,  // Custom error message for validation
    },
    name:{
        type: String,
        required:[true, ""],
    },
    password: {
        type: Number,
        required: [true, "Enter a valid password"],
    },
    age: {
        type: Number,
        required: [true, ""],
        min: 17,
    },
    email: {
        type: String,
        required: [true, ""],
        unique:true,
        match: [/\S+@+\S+\.\S/, "Please Enter a Valid Email address"]
    },
    college:{
        type: String,
        required:[true,""]
    },
    number:{
        type:Number,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return(value.length==10);
            }
        }
    }
});

// Create the model based on the schema
module.exports = mongoose.model('profiles', SchemaProfile);




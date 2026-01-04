const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
     
    firstName: {
        type: String,
        require:true,
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
               
                throw new Error("Invalid email address: " + value);
            }
        }

    },
    password: {
        type:String,
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
               
                throw new Error("Password is not strong: " + value);
            }
        }
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String],
    },
},
    {
        timestamps:true    
    }
);

// const User = mongoose.model("User",userSchema);
// module.exports = User;

module.exports = mongoose.model("User",userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type : String, 
        required : true,
        unique : true,
        
    },
    password :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        
    },
    role :{
        type : String,
        required : true,
        default : "NORMAL"
    }

}, {timeStamp : true}, 
)
const USER = mongoose.model("user", userSchema)
module.exports = USER
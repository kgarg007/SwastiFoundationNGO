const mongoose = require('mongoose');
const {Schema}=mongoose;


const userSchema = new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String
    },
    message:{
        type:String
    }

},{timestamps:true})

const volunteer = mongoose.model("volunteer",userSchema);


module.exports = volunteer;
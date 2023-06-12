const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model('users',usersSchema)
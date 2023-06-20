const mongoose = require("mongoose")

const eventsSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    start:{
        type:String,
        require:true
    },
    end:{
        type:String,
        require:true
    },
    detail:{
        type:String,
        require:true
    },
    user:{
        type:String,
        require:true
    },
},{timestamps:true})

module.exports = mongoose.model('events',eventsSchema)
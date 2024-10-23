const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:new Date().getTime()
    }
});
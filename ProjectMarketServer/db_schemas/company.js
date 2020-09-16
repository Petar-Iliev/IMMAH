const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    name:{
        type:String,
        required:true,
     
    },
    logo:{
        type:String,
        default:'NONE'
    },
    link:{
        type:String,
        require:true,
    },
    rating:{type:Number,default:0},
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]
})

module.exports = mongoose.model("Company",Company);
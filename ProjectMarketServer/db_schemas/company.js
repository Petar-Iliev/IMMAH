const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    name:{
        type:String,
        required:true,
     
    },
    link:{
        type:String,
        require:true,
    },
    rating:Number,
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]
})

module.exports = mongoose.model("Company",Company);
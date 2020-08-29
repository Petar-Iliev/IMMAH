const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username:{
        type:String,
        minlength:1,
        maxlength:28,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    roles:[{type:mongoose.Schema.Types.ObjectId, ref:'Role'}]
})




module.exports=mongoose.model("User",User);
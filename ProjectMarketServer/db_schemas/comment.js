const mongoose = require('mongoose');


const modelSchema = new mongoose.Schema({

    author_name:{
        type:String,
        default: "Anonymous"
    },
    message:{
        type:String,
        minlength:2
    },
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}] 
})


module.exports = mongoose.model("Comment",modelSchema);
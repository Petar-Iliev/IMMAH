const mongoose = require('mongoose');


const modelSchema = new mongoose.Schema({

    author_name:{
        type:String,
        default: "Anonymous"
    },
    message:{
        type:String,
        minlength:2
    }

})


module.exports = mongoose.model("Comment",modelSchema);
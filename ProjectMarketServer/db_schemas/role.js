const mongoose = require('mongoose');


const Role = new mongoose.Schema({
    name:String,
    users:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
})

module.exports = mongoose.model("Role",Role);
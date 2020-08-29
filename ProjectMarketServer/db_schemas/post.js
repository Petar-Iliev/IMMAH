const mongoose = require('mongoose');




const modelSchema = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    rating:{
        type:Number,
        required:true,
    },
    status_code:{
        type:Number,
        require:true,
        default:0
    },
    author_message:{
        type:String,
        required:true,
        minlength:5
    },
    company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
    create_on:{type:Date, default:Date.now},
    links: [{
        type:String,
    }],
    voting:{
        type:Boolean,
        default:false
    },
    vote_stats:{
        type: Map,
        of:Boolean,
    },
    voting_end_date:{
      type: Date
    },
    admin_info:{
      links:[{type:String}],
       comments:[{type:mongoose.Schema.Types.ObjectId, ref: "Comment"}]
    },
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
  
})


module.exports= mongoose.model('Post',modelSchema);

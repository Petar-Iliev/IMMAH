const mongoose = require('mongoose');
const bcrpy = require('bcrypt');

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

User.pre('save',async function(next){
    const salt = await bcrpy.genSalt();
    this.password = await bcrpy.hash(this.password,salt);
    next();
})

User.statics.login = async function(username,password){
    const user = await this.findOne({username});
    if(user){

        const auth = await bcrpy.compare(password,user.password);
        if(auth){
            return user;
        }else{
            throw Error('incorrect password');
        }

    }else{
        throw Error('user doesnt exist')
    }
}


module.exports=mongoose.model("User",User);
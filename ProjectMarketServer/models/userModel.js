const User = require('../db_schemas/user');
const Role = require('../db_schemas/role');


const init_roles= async()=>{
      await new Role({name:"ADMIN"}).save();
      await new Role({name:"USER"}).save();
      await new User({username:"anonymous",password:'123123'}).save();
}

const user_create=async (req,res)=>{
  

    // await Role.deleteMany({});
    // await User.deleteMany({});
    // res.send({"a":"b"});
 
    const {username,password} = req.body;

    if(username.trim().length < 1 || password.trim().length < 6){
        res.statusCode = 400; 
        res.send(JSON.stringify({msg:'Invalid props'}));
    }

    const users = await User.find({});
  

    if(users.length===0){
        init_roles();
        const roles = await Role.find({});

        const admin = new User({username,password,roles});
        await admin.save();
        res.statusCode = 201;
        res.send(JSON.stringify({msg:"Created"}));
    }else{

        const exist = await User.findOne({username})
      

        if(exist !== null){
            res.statusCode = 400;
            res.send(JSON.stringify({msg:"User already exist"}));
        }else{
            
          
            const roles = await Role.find({name:"USER"});
         

            const user = new User({username,password,roles});
            console.log(user);
            await user.save();
            
            res.statusCode = 201;
            res.send(JSON.stringify({msg:"Created"}));
        }
    }

}

const user_login = async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username}).populate('roles');

    if(user === null || user.password !== password){
        res.statusCode = 400;
        res.send({err:'Invalid username or password.'})
    }else{
        res.send(JSON.stringify(user));
    }
}

const user_find = async (req,res) =>{
    const username = req.query.username;
    const user= await User.findOne({username:username})
    .populate('roles')
   
    res.send({user});
}




module.exports ={
    user_create,
    user_login,
    user_find,
}


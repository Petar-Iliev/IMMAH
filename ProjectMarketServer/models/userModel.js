const User = require('../db_schemas/user');
const Role = require('../db_schemas/role');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'decoybank@gmail.com',
        pass:'B@NK_****_sveta'
    }
})

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
            res.send(JSON.stringify({err:"User already exist"}));
        }else{
            
          
            const roles = await Role.find({name:"USER"});
         

            const user = new User({username,password,roles});
      
            await user.save();
            
            res.statusCode = 201;
            res.send(JSON.stringify({msg:"Created"}));
        }
    }

}

const maxAge = 3*24*60*60;
const create_token = (id) =>{   
    return jwt.sign({id},'net ninja secret',{
        expiresIn:maxAge
    })
}

const user_login = async (req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username}).populate('roles');


    // console.log(user.password);
    // if(user === null || user.password !== password){
    //     res.statusCode = 400;
    //     res.send({err:'Invalid username or password.'})
    // }else{
    //     res.send(JSON.stringify(user));
    // }

    try{
        const user= await User.login(username,password);
        const token = create_token(user._id);
        const domain = 'localhost';
        
        // res.header("Access-Control-Allow-Headers","*")
        res.cookie('jwt',token,{maxAge:maxAge*1000, sameSite:'lax'}); 
        
      
        res.json(user._id);
    }catch(err){
        res.json({err:'err'});
    }

}

const user_email = async (req,res)=>{

    const {msg,email,name} = req.body;


    let mailOptions ={
        from :email,
        to : 'decoybank@gmail.com',
        subject:`IMMAH - ${name}`,
        text:`${email} - ${msg}`
    }

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })

    res.json({"bla":"a"});
}

const user_find = async (req,res) =>{
    const username = req.query.username;
    const user= await User.findOne({username})
    .populate('roles')
   
    res.send({user});
}




module.exports ={
    user_create,
    user_login,
    user_email,
    user_find,
}


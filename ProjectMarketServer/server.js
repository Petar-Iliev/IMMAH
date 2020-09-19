const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'twisteddd',
    api_key:'585138921326611',
    api_secret:'gaPDPbdjq5FqdgIrcixVS45Mn5g'
})

const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const app = express();


// const Post = require('./db_schemas/post');
// const User = require('./db_schemas/user');
// const Role = require('./db_schemas/role');


const postRouter = require('./routes/post/postrouter');
const userRouter = require('./routes/user/userrouter');
const companyRouter = require('./routes/comapny/companyrouter');
const PORT = process.env.PORT || 8000;

app.use(cookieParser())
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true
}));

app.use("/post",postRouter);
app.use('/user',userRouter);
app.use('/company',companyRouter);

app.post("/test",async (req,res)=>{
 
    
    
 
   
   const filePath = req.files.file.tempFilePath;

   try{
   const uploadResponse = await cloudinary.uploader.upload(filePath,{resource_type:'video'});
   console.log(uploadResponse);
   
   }catch(err){
       console.log(err);
   }
    res.send("dddd");
})

// app.get("/page",(req,res)=>{
//     console.log("Querys "+req.query.number +" "+req.query.ks );

//     res.send("aha")
// })

// app.get("/blank/:model/:not",(req,res)=>{

//     console.log(req.params);
//     res.send("res");
// })


mongoose.connect('mongodb://localhost:27017/proj_db',{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true})

app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})















// const filePath = req.files.file.tempFilePath;

// try{
// const uploadResponse = await cloudinary.uploader.upload(filePath,{resource_type:'video'});
// console.log(uploadResponse);

// }catch(err){
//     console.log(err);
// }
//  res.send("dddd");
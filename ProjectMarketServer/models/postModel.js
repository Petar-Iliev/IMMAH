const Post = require('../db_schemas/post');
const Company = require('../db_schemas/company');
const User = require('../db_schemas/user');

const companyModel = require('./companyModel');

const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

const LIMIT = 6;
const valid_img_mime_types = ["image/jpeg", "image/png",];
const valid_video_mime_type = ["audio/wav","audio/mp4","audio/mp3","video/mp4","video/mp3",'audio/mpeg']


const delete_all = async (req,res)=>{
 await User.deleteMany({});
  await Post.deleteMany({});
 await Company.deleteMany({});
 res.send("DELETED");
}

const post_all_get = async (req,res)=>{

  const skip = req.query.page;

  Post.find()
  .limit(LIMIT)
  .skip(skip*LIMIT)
  .sort({create_on:-1})
  .populate('company')
  .populate('author')
  .exec(function(err,posts){
    if(err){
      res.send(JSON.stringify({err:"Something went wrong"}))
    }else{
      res.send(posts);
    }
  })  
}

  const post_create = async (req,res)=>{

  
    const {companyName,companyLink,rating,ese,username} = req.body;
  await companyModel.create_company({companyName,companyLink});  
  const company = await Company.findOne({name:companyName});
  const companyId= company._id;
  const user = await User.findOne({username});
  const userId = user._id;
  const data = {
     author:userId,
     author_message:ese,
     company:companyId,
     rating
  }

  await new Post(data).save(function(err,post){
    if(err){
      console.log(err);
      res.send(JSON.stringify({err:"Something went wrong"}));
    }else{
        res.send(JSON.stringify(post));
    }
  });

}

const post_create_file = async(req ,res) =>{
  // const filePath = req.files.file.tempFilePath;
  // console.log(req.files.file);
 const {id} = req.query;
 let post = await Post.findById(id);
 
 if(post===null){
   res.statusCode=404;
   res.send(JSON.stringify({msg:"Post not found"}));
 }
 
 const filePath = req.files.file.tempFilePath;
 const mimeType = req.files.file.mimetype
 let type;

 if(valid_img_mime_types.includes(mimeType)){
   type="image";
 }else if(valid_video_mime_type.includes(mimeType)){
   type = "video"
 }

 if(!type){
   res.statusCode = 415;
   res.send(JSON.stringify({err:"Invalid MIME TYPE"}));
 }else{

 try{
 const uploadResponse = await cloudinary.uploader.upload(filePath,{resource_type:type});
 console.log(uploadResponse);
 
//  let links = post.links;
//  links.push(uploadResponse.url);
console.log(post);
 post.links.push(uploadResponse.url);
 await post.save();
 }catch(err){
     console.log(err);
 }
 res.send(JSON.stringify({msg:"uploaded"}));
 }
}

const post_find_by_id = async (req,res)=>{

  console.log(req.query.id);
  await Post.findById(req.query.id)
  .populate('company')
  .populate('author')
  .exec(function(err,post){
    if(err){
      res.send(JSON.stringify({err:"Not found"}));
    }else{
      
      res.send(JSON.stringify(post));
    }
  })
  

}


module.exports={
  delete_all,
  post_all_get,
  post_create,
  post_create_file,
  post_find_by_id
}
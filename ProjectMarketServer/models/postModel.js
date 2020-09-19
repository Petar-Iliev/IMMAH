const Post = require('../db_schemas/post');
const Company = require('../db_schemas/company');
const User = require('../db_schemas/user');
const Comment = require('../db_schemas/comment');
const companyModel = require('./companyModel');

const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');


const LIMIT = 6;
const days = 14;
const valid_img_mime_types = ["image/jpeg", "image/png",];
const valid_video_mime_type = ["audio/wav", "audio/mp4", "audio/mp3", "video/mp4", "video/mp3", 'audio/mpeg']


const delete_all = async (req, res) => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Company.deleteMany({});
  res.send("DELETED");
}

const post_all_get = async (req, res) => {

  const skip = req.query.page;

 
  Post.find({ status_code: 2 })
    .limit(LIMIT)
    .skip(skip * LIMIT)
    .sort({ create_on: -1 })
    .populate('company')
    .populate('author')
    .exec(function (err, posts) {


    
      if (err) {
        res.send(JSON.stringify({ err: "Something went wrong" }))
      } else {
        res.send(posts);
      }
    })
}

const get_post_count = async (req,res) =>{
  const c = await Post.countDocuments({status_code:2});
  let pages =Math.floor(c/LIMIT);
 
  res.send(JSON.stringify(pages));
}

const post_create = async (req, res) => {


  const { companyName, companyLink, rating, ese, username } = req.body;
  const company = await companyModel.create_company({ companyName, companyLink });
  
  const companyId = company._id;
  const user = await User.findOne({ username });

  const userId = user._id;



  const data = {
    author: userId,
    author_message: ese,
    company: companyId,
    rating
  }

  await new Post(data).save(async function (err, post) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ err: "Something went wrong" }));
    } else {
      const newRating = (company.rating + rating);
      company.rating = newRating;

      let comapnyPosts = company.posts;
      comapnyPosts.push(post._id);
      await company.save();
      res.send(JSON.stringify(post));
    }
  });

}

const post_create_file = async (req, res) => {
  // const filePath = req.files.file.tempFilePath;
  // console.log(req.files.file);
  const { id } = req.query;
  let post = await Post.findById(id);

  if (post === null) {
    res.statusCode = 404;
    res.send(JSON.stringify({ msg: "Post not found" }));
  }

  const filePath = req.files.file.tempFilePath;
  const mimeType = req.files.file.mimetype
  let type;

  if (valid_img_mime_types.includes(mimeType)) {
    type = "image";
  } else if (valid_video_mime_type.includes(mimeType)) {
    type = "video"
  }

  if (!type) {
    res.statusCode = 415;
    res.send(JSON.stringify({ err: "Invalid MIME TYPE" }));
  } else {

    try {
      const uploadResponse = await cloudinary.uploader.upload(filePath, { resource_type: type });

      

      //  let links = post.links;
      //  links.push(uploadResponse.url);

      
      post.links.push(uploadResponse.url);
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.send(JSON.stringify({ msg: "uploaded" }));
  }
}

const post_find_by_id = async (req, res) => {


  await Post.findById(req.query.id)
    .populate('company')
    .populate('author')
    .populate('comments')
    .populate({
      path: 'admin_info',
      populate: {
        path: 'comments',
        model: 'Comment'
      }
    })
    .exec(function (err, post) {

      if (err) {
        res.send(JSON.stringify({ err: "Not found" }));
      } else {

        res.send(JSON.stringify(post));
      }
    })


}

const post_comment = async (req, res) => {

  const { postId } = req.query;
  const { username, message } = req.body;

  const post = await Post.findById(postId)
    .populate('comennts');
  const user = await User.findOne({ username })

  let commentId = await new Comment({ author_name: user.username, message: message, post: post._id }).save()
    .then(data => {
      return data._id;
    })

  let comments = post.comments;

  comments.push(commentId);
  post.comments = comments;
  await post.save();

  const newPost = await Post.findById(postId)
    .populate('comments')
    .populate({
      path: 'admin_info',
      populate: {
        path: 'comments',
        model: 'Comment'
      }
    });

  res.send(JSON.stringify(newPost));
}


const get_pending_posts = async (req, res) => {

  const posts = await Post.find({ status_code: 0, voting: false }).populate('company').populate('author');

  res.send(JSON.stringify(posts));
}

const get_votable_posts = async (req, res) => {

  const {user} = req.query;


  
await Post.find({ voting: true, voting_end_date: { $gt: Date.now() } }).populate('company')
  .exec(function(err,posts){
    if(err){
      res.send(JSON.stringify({msg:'something went wrong'}));
    }else{

      const data=[];
    
      posts.forEach(p=>{
    
      if(!p.vote_stats.has(user)){
        data.push(p);
      }
      })
   
      res.send(JSON.stringify(data));
    }
  })
  ;


}

const delete_post = async (req, res) => {

  const { id } = req.query;
  await Post.deleteOne({ _id: id }, function (err) {
    if (err) {
      res.send(JSON.stringify({ err: "Something went wrong" }));
    } else {
      res.send(JSON.stringify({ msg: "DELETED" }));

    }
  })


}

const patch_pick_up = async (req, res) => {
  const { id } = req.query;
  await Post.updateOne({ _id: id }, { $set: { status_code: 1 } }, function (err) {
    if (err) {
      res.send(JSON.stringify({ err: 'Something went wrong' }));
    } else {
      res.send(JSON.stringify({ msg: 'Updated' }));
    }

  });
}

const patch_voting = async (req, res) => {
  const { id } = req.query;

  let date = new Date();
  date.setDate(date.getDate() + days)

  await Post.updateOne({ _id: id }, { $set: { voting: true, voting_end_date: date } }, function (err) {
    if (err) {
      res.send(JSON.stringify({ err: 'Something went wrong' }));
    } else {
      res.send(JSON.stringify({ msg: 'Updated' }));
    }

  });
}

const get_picked_posts = async (req, res) => {

  const posts = await Post.find({ status_code: 1 }).populate('company').populate({
    path: 'admin_info',
    populate: {
      path: 'comments',
      model: 'Comment'
    }
  });

  
  res.send(JSON.stringify(posts));
}

const patch_upload_admin_files = async (req, res) => {

  const { id } = req.query;
  let post = await Post.findById(id);
  if (post) {

    const filePath = req.files.file.tempFilePath;
    const mimeType = req.files.file.mimetype
    if (valid_img_mime_types.includes(mimeType)) {
      type = "image";
    } else if (valid_video_mime_type.includes(mimeType)) {
      type = "video"
    }

    if (!type) {
      res.statusCode = 415;
      res.send(JSON.stringify({ err: "Invalid MIME TYPE" }));
    } else {

      try {
        const uploadResponse = await cloudinary.uploader.upload(filePath, { resource_type: type });


        //  let links = post.links;
        //  links.push(uploadResponse.url);
 
        post.admin_info.links.push(uploadResponse.url);
        await post.save();
      } catch (err) {
        console.log(err);
      }
      res.send(JSON.stringify({ msg: "uploaded" }));
    }

  }
}

const patch_publish_post = async (req, res) => {
  const { id } = req.query;

  const post = await Post.findById(id);
  post.status_code = 2;
  await post.save();

  res.send(JSON.stringify({ msg: 'Modified' }));

}
const patch_vote = async (req, res) => {
  const { id } = req.query;
  const { vote, username } = req.body;

  const post = await Post.findById(id);
  const user = await User.findOne({ username });

  post.vote_stats.set(user.username, vote);
  await post.save();
  res.send(JSON.stringify({ msg: 'voted' }))
}

const patch_admin_comment = async (req, res) => {
  const { id } = req.query;
  const { adminComment } = req.body;
  let post = await Post.findById(id).populate({
    path: 'admin_info',
    populate: {
      path: 'comments',
      model: 'Comment'
    }
  });

  if (post) {

    let comments = post.admin_info.comments;
    let com = await new Comment({ author_name: 'ADMIN', message: adminComment, post: post._id }).save();
    comments.push(com._id);

    post.admin_info.comments = comments;
    await post.save();

    res.send(JSON.stringify({ msg: "Commented" }));
  } else {
    res.statusCode = 404;
    res.send(JSON.stringify({ err: "POST NOT FOUND" }));
  }

}
const patch_admin_logo = async (req,res) =>{
  
  const {id} = req.query;
  
  let post = await Post.findById(id).populate('company');
  if (post) {

   
    const filePath = req.files.file.tempFilePath;
    const mimeType = req.files.file.mimetype
    if (valid_img_mime_types.includes(mimeType)) {
      const uploadResponse = await cloudinary.uploader.upload(filePath, { resource_type: 'image' });
      const company =await Company.findById(post.company._id);
      company.logo=uploadResponse.url;
      await company.save();
      res.send(JSON.stringify({msg:'LOGO UPLOADED'}));
    }else{
      res.statusCode = 415;
      res.send(JSON.stringify({ err: "Invalid MIME TYPE" }));
    }

}
}
module.exports = {
  patch_vote,
  patch_publish_post,
  patch_voting,
  patch_pick_up,
  patch_upload_admin_files,
  patch_admin_logo,
  patch_admin_comment,
  delete_all,
  delete_post,
  post_all_get,
  post_create,
  post_create_file,
  post_find_by_id,
  post_comment,
  get_pending_posts,
  get_picked_posts,
  get_votable_posts,
  get_post_count
}
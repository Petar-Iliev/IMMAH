const Post = require('../db_schemas/post');

const LIMIT = 5;

const post_all_get = async (req,res)=>{

    console.log(req.query);
//     console.log(req.params);
//     const skipNumber = req.params.number ? +req.params.number : 0;

//    const posts = await Post.find({}).skip(LIMIT*skipNumber).limit(LIMIT);

//     res.send(posts);
 res.send("sss");
}


module.exports={
  post_all_get
}
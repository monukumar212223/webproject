const Post=require('../models/post')
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
   let post=await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    if(req.xhr){
      return res.status(200).json({
          data:{
            post:post
          },
          message:"spost created"
      });
    }

    req.flash('success','post published');
    return res.redirect('back');
}
 catch{
 console.log('error',err);
 req.flash('error',err);
 return ;
  }
}

module.exports.destroy= async function(req,res){
  try{
    let post=await  Post.findById(req.params.id);
    //.id means _id
       if(post.user==req.user.id){
        post.remove();
      await  Comment.deleteMany({post:req.params.id});
      
    if(req.xhr){
      return res.status(200).json({
        data:{
          post_id:req.params.id
        },message:" deleted"
      });
    }


      req.flash('success','post deleted');
      return res.redirect('back');
       }
       else{
         req.flash('error',"you cannot delete");
           return res.redirect('back'); 
       }
  }
  catch(err){
      console.log('error',err);
      return res.redirect('back');
  }
    }
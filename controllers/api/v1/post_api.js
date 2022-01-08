const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){
    
    let posts= await Post.find({})
 .sort('-createdAt')
 .populate('user')
 .populate( {
     path:'comments',
     populate:{
         path:'user'
     }
    });

    return res.json(200,{
        message:"list of post",
        posts:posts
    })
}

module.exports.destroy= async function(req,res){
    try{
      let post=await  Post.findById(req.params.id);
      //.id means _id
         if(post.user==req.user.id){
          post.remove();
        await  Comment.deleteMany({post:req.params.id});
      return res.json(200,{
      messgae:"posts and associated comments are deleted"
      });
    }   
     // if(req.xhr){
        //return res.status(200).json({
          //data:{
           // post_id:req.params.id
         // },message:" deleted"
       // });
      //}
      //  req.flash('success','post deleted');
      /// return res.redirect('back');
         //}
         else{
           //req.flash('error',"you cannot delete");
           return res.json(401,{
             message:"you cannot delete this post"
           }); 
         }
    }
    catch(err){
        console.log('error',err);
       return res.json(500,{
           message:"internal server error"
       });
    }
      }






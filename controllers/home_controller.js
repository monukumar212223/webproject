
const { exec } = require('child_process');
const { populate } = require('../models/post');
const Post=require('../models/post');
const User=require('../models/user');
module.exports.home = async function(req, res){
   // console.log(req.cookies);
    // res.cookie('user_id', 25);
    

  //Post.find({},function(err,posts){
    //return res.render('home', {
     //   title: "Codeial |Home",
      //  posts:posts
   // });
//});

  try{
let posts= await Post.find({})
 .sort('-createdAt')
 .populate('user')
 .populate( {
     path:'comments',
     populate:{
         path:'user'
     }
 });
 //exec(function(err,posts){
   let users=await User.find({}); 
   return res.render('home',{
    title:"Codeial |Home",
    posts:posts,
    all_users:users
});
  }
  catch(err){
      console.log('error',err);
      return ;
  }
}
// module.exports.actionName = function(req, res){}

//Post.find({}).populate('comments').then(function());
//let users=User.find({},function(err,users){
    ///return res.render('home',{
  ////      title:"Codeial |Home",
    //    posts:posts,
     //   all_users:users
   // });
//});
//let posts=Post.find({}).populate('comments').exec();

//posts.then();
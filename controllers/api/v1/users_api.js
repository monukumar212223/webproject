const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');
module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        //console.log(req.body.email);  
        //console.log(user.password);
        //console.log(req.body.password);
        if(!user||user.password!=req.body.password){
            return res.json(422,{
            message:"invalid username password"
            });
        }
        return res.json(200,{
            message:"here is your token keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'10000'})
            }
        });
    }
    catch(err){
        console.log('*********error',err);
       return res.json(500,{
           message:"internal server error"
       });
    }
}
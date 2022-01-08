
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:"69431482961-ttfi6dmc103e204qodki5vbfdqkc2r5a.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8002/users/auth/google/callback",
     },
     function(accessToken,refreshToken,profile,done){
       
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
       if(err){console.log('error i oolestar',err);return ;}
      console.log(profile);
      if(user){
         return done(null,user);
      }
      else{
         User.create({
             name:profile.displayName,
             email:profile.emails[0].value,
             password:crypto.randomBytes(20).toString('hes')
         },function(err,user){
            if(err){console.log("error in signiup",err);return ;}
            return done(null,user);
        });
    }
}); 
}
));

module.exports=passport;

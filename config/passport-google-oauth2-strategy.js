
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');
passport.use(new googleStrategy({
    clientID:env.google_clientID,
    clientSecret:env.google_clientSecret,
    callbackURL:env.google_callbackURL,
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

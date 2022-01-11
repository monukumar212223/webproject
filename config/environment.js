
const development={
    name:"development",
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        post:507,
        secure:false,
        auth:{
            user:'monuchauhan212223',
            pass:'Monu@2001'
        }
    },
    google_clientID:"69431482961-ttfi6dmc103e204qodki5vbfdqkc2r5a.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL:"http://localhost:8002/users/auth/google/callback",
    jwt_secret:'codeial'
}
const production={
    name:"production"
}

module.exports=development;


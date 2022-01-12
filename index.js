const express = require('express');
const env=require('./config/environment');
const logger=require('morgan');

const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8002;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const sassMiddleware=require('sass-middleware');
const flash =require('connect-flash');
const customMware=require('./config/middleware');
const passportGoogle=require('./config/passport-google-oauth2-strategy');

//setup the chat server with socket.io

const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is on port 5000');
const path=require('path');
/*app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));*/

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
  name:'codeial',
  secret:env.session_cookie_key,
  saveUninitialized:false,
  resave:false,
   cookie:{
       maxAge:(1000*60*100)
   }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));
app.listen(process.env.port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${process.env.port}`);
});

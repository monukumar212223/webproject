
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');

let transporters=nodemailer.createTransport(env.smtp);

let renderTemplates=(data,realtivePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',realtivePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err); return ;}
            mailHTML=template;
        }
        )   
        return mailHTML;
}

module.exports={
    transporter:transporters,
    renderTemplate:renderTemplates
}
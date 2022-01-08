
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


let transporters=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    post:507,
    secure:false,
    auth:{
        user:'monuchauhan212223',
        pass:'Monu@2001'
    }
});

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
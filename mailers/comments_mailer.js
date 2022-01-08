
const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment) =>{
    console.log('inside new comment mailer');
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
    from :'monuchauhn212223@gmail.com',
    to:comment.user.email,
    subject:"New comment Published",
    html:htmlString
    },(err,info)=>{
        if(err){console.log('error ins sending mail',err);return ;}
        console.log("message sent",info);
        return ;
    });
}
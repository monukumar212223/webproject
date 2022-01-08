
const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment) =>{
    console.log('inside new comment mailer');

    nodeMailer.transporter.sendMail({
    from :'monuchauhn212223@gmail.com',
    to:comment.user.email,
    subject:"New comment Published",
    html:'<h1>yup your comment now published</h1>'
    },(err,info)=>{
        if(err){console.log('error ins sending mail',err);return ;}
        console.log("message sent",info);
        return ;
    });
}
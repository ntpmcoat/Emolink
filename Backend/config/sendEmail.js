import nodemailer from 'nodemailer';

let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'jaimishra20031@gmail.com',
        pass:'',
    }
});

let mailDetails={
    from:'Emolink',
    to:Data.client,
    subject:"Test email",
    text:"Good Morning",
}

mailTransporter.sendMail(mailDetails,function(err,data) {
    if(err){
        console.log('Error occured');
    }
    else{
        console.log('Email Sent');
    }
    
})
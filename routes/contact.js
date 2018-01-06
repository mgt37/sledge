var express     = require("express"),
    router      = express(),
    bodyParser  = require('body-parser'),
    path        = require('path'),
    exphbs      = require('express-handlebars'), //Check if this conflicts with ejs
    nodeMailer  = require("nodemailer");
    
    /*require('./routes/email');*/
    
/*router.engine('handlebars', exphbs ());  //Check if this conflicts with ejs
router.set('view-engine', 'handlebars');*/ //Check if this conflicts with ejs

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
    
router.get('/contact', function(req,res){
res.render('contact');
}); 

router.post('/formsend', function(req, res) {
    var output = {
    /*email: req.body.email,*/ //Leave out email
    subject: req.body.subject,
    message: req.body.message
    };
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodeMailer.createTransport({
        host: 'smtpauth.discountdomains.co.nz',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mail@sledge.co.nz', // generated ethereal user
            pass: 'violet41stone'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <mail@sledge.co.nz>', // sender address
        to: 'mail@sledge.co.nz', // list of receivers
        subject: 'subject', // Subject line
        text: 'message', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
    });
});
    
    
    

    








    
    // create reusable transporter object using the default SMTP transport
    /*let transporter = nodeMailer.createTransport({
        host: 'smtpauth.discountdomains.co.nz',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mail@sledge.co.nz', // generated ethereal user
            pass: 'violet41stone'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });*/

    // setup email data with unicode symbols
   /* let mailOptions = {
        from: '"Nodemailer Contact" <mail@sledge.co.nz>', // sender address
        to: 'mail@sledge.co.nz', // list of receivers
        subject: 'subject', // Subject line
        text: 'message', // plain text body
        html: output // html body
    };*/

    // send mail with defined transport object
    /*transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));

        res.render('contact', {msg:'Email has been sent'});*/
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
/*    });

}); 
*/


/*router.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});*/

module.exports = router;
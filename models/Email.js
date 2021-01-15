"use strict";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

class Email{
    sendEmail(request, respond){
        console.log("In node js sending email");
        console.log(request.body);
        var username = request.body.username;
        var email = request.body.email_address;

        const msg = {
            //to: email_address, // Change to your recipient
            to: '2000639A@student.tp.edu.sg',
            from: '2000639A@student.tp.edu.sg', // Change to your verified sender
            subject: 'Forgot Password',
            text: 'Dear user, you have requested to change your password from Restaurant Kingdom.',
            html: '<p>Click on the  <a href="https://localhost:8080/forget-password.html">link</a> to proceed onward to change your password.</p>'
        }

        sgMail.send(msg).then(() => {
            console.log('Email sent');
            respond.json("Email sent");
        })
        .catch((error) => {
            console.error(error);
            respond.json(error);
        })
    }
}

module.exports = Email;
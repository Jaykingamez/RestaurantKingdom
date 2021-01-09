const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

function sendEmail(){
    username = document.getElementById("forgot-username").value;
    fetchAccountUsername().then((returned_account) => {
        if(returned_account.length > 2){
            var email_address = JSON.parse(returned_account)[0]["email_address"];

            const msg = {
                //to: email_address, // Change to your recipient
                to: '2000639A@student.tp.edu.sg',
                from: '2000639A@student.tp.edu.sg', // Change to your verified sender
                subject: 'Forgot Password',
                text: 'Dear user, you have requested to change your password from Restaurant Kingdom.',
                html: '<p>Click on the  <a href="https://localhost:8080/forget-password.html">link</a> to proceed onward to change your password.</p>'
            }

            sgMail.send(msg).then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        }
        
        
    });
}
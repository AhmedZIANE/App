var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');

var transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `Name: ${name} \nEmail: ${email} \nMessage: ${message} `

  var mail = {
    from: name,
    to: 'ziane4926@gmail.com',  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Your Web Site',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })

      transporter.sendMail({
        from: 'ziane4926@gmail.com',
        to: email,
        subject: "Submission was successful",
        text: `Hi ${name},\n\nThank you for contacting me !\n\nContact details\n\n  -  Name : ${name}\n  -  Email : ${email}\n  -  Message : ${message}\n\nBest regards,\nAhmed ZIANE`
    }, function(error, info){
        if(error) {
            console.log(error);
        } else{
            console.log('Message sent: ' + info.response);
        }
  });

    }
  })
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)
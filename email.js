const nodemailer = require('nodemailer');
const sender = "domiotesting187@hotmail.com";

let transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: sender,
    pass: "samplep@ss"
  }
});


function sendMail (listing, displayPrice, basePrice, type) {

    let htmlHome = `
        For listing with id ${listing}, the display price is ${displayPrice}, which is less than the base price of ${basePrice}.
    `

    let htmlApt = `
        For listing with id ${listing}, the display price is ${displayPrice}, which is more than the base price of ${basePrice}.
    `

    let mailOptions = {
      from: sender,
      to: "emailservice187@gmail.com",
      subject: `Price Update for listing ${listing}`,
      html: type === "home" ? htmlHome : htmlApt
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

}


module.exports = sendMail;
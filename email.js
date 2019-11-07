const nodemailer = require('nodemailer');

const sender = "domiotesting187@hotmail.com";

let transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: sender,
    pass: "samplep@ss"
  }
});


function sendMail (to, listing, oldPrice, newPrice, link) {
    
    let mailOptions = {
      from: sender,
      to: to,
      subject: `Price Update for listing ${listing}`,
      html: `
        Good news! Listing ${listing}, which is on your wishlist, has had a reduction in price from ${oldPrice} to ${newPrice}. Book now <a href="${link}">here</a>!
      `
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
var nodemailer = require('nodemailer');

var sender = "emailservice187@gmail.com";

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
//   service: 'gmail',
  port: 587,
  secure: false, 
  auth: {
    user: sender,
    pass: 'samplep@ss'
  }
});


function sendMail (to, listing, oldPrice, newPrice, link) {

    var mailOptions = {
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



sendMail("likeaduck@gmail.com", "foobar", 230, 200, "http://google.com")
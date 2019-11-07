var nodemailer = require('nodemailer');

var sender = "domiotesting187@hotmail.com";

var transporter = nodemailer.createTransport({
    // host: 'smtp.mail.yahoo.com',
    // port: 587,
  service: "Hotmail",
  auth: {
    // type: "login",
    user: sender,
    pass: "samplep@ss"
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
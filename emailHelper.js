const nodemailer = require('nodemailer');
const sender = "domiotesting187@hotmail.com";
const recevier = "emailservice187@gmail.com";

let transporter = nodemailer.createTransport({
  service: "Hotmail",
  auth: {
    user: sender,
    pass: "samplep@ss"
  }
});

function sendMail (listing, displayPrice, basePrice, type) {
// method sends an email regarding the price change 
  // listing: string, property.id
  // displayPrice: number, property.dynamicDisplayPrice
  // basePrice: number, property.baseprice
  // type: string, property.type
    let htmlHome = `
        For listing with id ${listing}, the display price is ${displayPrice}, which is less than the base price of ${basePrice}.
    `
    let htmlApt = `
        For listing with id ${listing}, the display price is ${displayPrice}, which is more than the base price of ${basePrice}.
    `

    let mailOptions = {
      from: sender,
      to: recevier,
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
const sendMail = require('./email.js');
const saveListing = require('./sqlSaver.js');

const axios = require('axios');
// sendMail("emailservice187@gmail.com", "foobar", 230, 200, "http://google.com");
const sourceURL = "https://interview.domio.io/properties/";

axios.get(sourceURL, {
  })
  .then(function (response) {
      let properties = response.data.properties

      properties.forEach(item=>{
        saveListing(item);
      })
    // console.log(response.data.properties);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  



// let keys = Object.keys(firstProp).join(',');
// let values = Object.values(firstProp);
// let questionMarks = values.map(item=> "?").join(',')

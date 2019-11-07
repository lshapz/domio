const {saveOrUpdate, closeDb}  = require('./sqlService.js');
const axios = require('axios');
const sourceURL = "https://interview.domio.io/properties/";
const sendMail = require('./emailHelper.js');

axios.get(sourceURL, {
  })
  .then(function (response) {
        let properties = response.data.properties
        let counter = 0;

        let int = setInterval(function(){
        if(counter < response.data.properties.length){
            let row = properties[counter];
            saveOrUpdate(row.id, row);
            if ((row.dynamicDisplayPrice > row.basePrice && row.type === "home") || (row.dynamicDisplayPrice < row.basePrice && row.type === "apartment")) {
                sendMail(row.id, row.dynamicDisplayPrice, row.basePrice, row.type);
            } 
            counter++;
        } else
            clearInterval(int);
            return;
        }, 3000);
        setTimeout(()=>{ 
            console.log('closing time');
            closeDb() 
        }, 50000)
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
  });  



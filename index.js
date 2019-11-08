const {saveOrUpdate, closeDb}  = require('./sqlService.js');
const axios = require('axios');
const sourceURL = "https://interview.domio.io/properties/";
const sendMail = require('./emailHelper.js');

let func = () => {
    axios.get(sourceURL, {
      })
      .then(function (response) {
            let properties = response.data.properties
            let counter = 0;
    
// note: using internal interval because Outlook doesn't like to send too many emails at once. 
// If using dedicated SMTP server, can refactor this into a simple forEach;
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
                // closeDb() 
            }, 50000)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });  
}


setInterval(func, 5000);
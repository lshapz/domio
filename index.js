const {saveOrUpdate, closeDb}  = require('./sqlService.js');
const axios = require('axios');
const sourceURL = "https://interview.domio.io/properties/";

axios.get(sourceURL, {
  })
  .then(function (response) {
        let properties = response.data.properties
        let counter = 0;

        let int = setInterval(function(){
        if(counter < response.data.properties.length){
            saveOrUpdate(properties[counter].id, properties[counter]);
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



const sqlite3 = require('sqlite3').verbose();
let firstProp = {
    "address": "1 Castle Ave",
    "basePrice": 6000.06,
    "bathrooms": 10.0,
    "bedrooms": 20.0,
    "city": "Citadel One",
    "description": "Romantic hideaway! This property has the lush beauty and privacy of Hana, without the drive! Only 15-20 minutes to the airport, 10 minutes to beaches, 2 minutes to restaurants and shops...on a private gated property with organic nursery. BEAUTIFUL!",
    "displayPictureUrl": "https://i.imgur.com/0700J1K.jpg",
    "dynamicDisplayPrice": 6175.06,
    "id": "410e409f-ac02-4afb-bbbe-8b7ff708647f",
    "occupancyRate": 0.6,
    "ownerId": "b7f065af-a43a-45ee-acff-bfa6757abf74",
    "state": "Casterly Rock",
    "totalRevenue": 10000.1,
    "type": "home"
  }


function saveOrUpdate(propID, property) {
    let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

      let sql = `SELECT * 
            FROM properties
            WHERE id  = ?
        `;

      db.get(sql, [propID], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        return row
          ? update(property)
          : insert(property);
       
      });

}


function update(property) {



}

function insert (property) {
    let keys = Object.keys(property).join(',');
    let values = Object.values(property);
    let questionMarks = values.map(item=> "?").join(',')
    

    let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });
    
    
      db.run(`INSERT INTO properties (${keys}) VALUES (${questionMarks})`, values, function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    
      db.close();
}

module.exports = saveOrUpdate;
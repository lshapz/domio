const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./props.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});


function saveOrUpdate(propID, property) {
// method determines whether we need to create a new row in the props table or update the existing row
    // propID: string, property.id
    // property: object, full property info from API 
    let sql = `SELECT * 
            FROM props
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


function insert (property) {
// method creates a new row in the props table for a listing with a new unique ID
    // property: object, full property info from API 

    db.run(`INSERT INTO props (id, type, dynamicDisplayPrice, basePrice, dateTime) VALUES (?, ?, ?, ?, ?)`, property.id, property.type, property.dynamicDisplayPrice, property.basePrice, Date.now(), function(err) {
        if (err) {
          return console.log(err.message + 2);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

function update(property) {
// method updates an existing row in the props table with the updated display price and the time that price was saved
    // property: object, full property info from API 
    let sql = `UPDATE props
    SET dynamicDisplayPrice = ?,
     dateTime = ?
    WHERE id = ?`;

    let id = property.id;
    let dateTime = Date.now()
    let display = property.dynamicDisplayPrice;

    db.run(sql, [display, dateTime, id], function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`); 
    });

}

function closeDb(){
    db.close()
}

module.exports = {saveOrUpdate, closeDb};
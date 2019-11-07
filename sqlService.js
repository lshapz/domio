const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./props.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});


function saveOrUpdate(propID, property) {

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
    let keys = Object.keys(property).join(',');
    let values = Object.values(property);
    let questionMarks = values.map(item=> "?").join(',')
    
    db.run(`INSERT INTO props (id, type, dynamicDisplayPrice, basePrice, dateTime) VALUES (?, ?, ?, ?, ?)`, property.id, property.type, property.dynamicDisplayPrice, property.basePrice, Date.now(), function(err) {
        if (err) {
          return console.log(err.message + 2);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

function update(property) {
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
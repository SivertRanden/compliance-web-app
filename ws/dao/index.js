const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

exports.initDb = function() {
  db.serialize(function() {
    // Create laws table
    const lawsCreateStatement = `CREATE TABLE  if not exists "laws" (
      "id"	INTEGER NOT NULL,
      "name" TEXT NOT NULL,
      "description"	TEXT NOT NULL,
      PRIMARY KEY("id"))`;
    db.run(lawsCreateStatement);

    //Debug data
    const testLaw =
      "INSERT INTO LAWS (id,name,description) VALUES (1,'First Law', 'This is a law')";
    db.run(testLaw);
  });
};

exports.getLaws = function(cb) {
  db.serialize(function() {
    db.all("SELECT * FROM LAWS", function(err, rows) {
      cb(err, rows);
    });
  });
};

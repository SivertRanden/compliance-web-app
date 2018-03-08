const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

function initDb() {
  db.serialize(function() {
    const lawsCreateStatement = `CREATE TABLE  if not exists "laws" (
      "id"	INTEGER NOT NULL,
      "name" TEXT NOT NULL,
      "description"	TEXT NOT NULL,
      PRIMARY KEY("id"))`;
    db.run(lawsCreateStatement);
  });
}

module.exports = initDb;

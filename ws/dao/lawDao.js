const dao = require("./db.js");
const db = dao.connection;

exports.getAllLaws = function(onDataReceived) {
  db.serialize(() => {
    db.all("SELECT * FROM law", (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        onDataReceived(err, rows);
      }
    });
  });
};

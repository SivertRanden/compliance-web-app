const dao = require("./db.js");
const db = dao.connection;

exports.getImplementationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get("SELECT * FROM implementation WHERE id_implementation = " + id, (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        onDataReceived(err, row);
      }
    });
  });
};

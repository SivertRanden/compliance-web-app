const dao = require("./db.js");
const db = dao.connection;

exports.getImplementationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get("SELECT * FROM implementation WHERE id_implementation = " + escape(id), (err, row) => {
      if (err) {
        return onDataReceived(err);
      } else {
        onDataReceived(err, row);
      }
    });
  });
};

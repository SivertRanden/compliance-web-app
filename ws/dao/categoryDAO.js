const dao = require("./db.js");
const db = dao.connection;

exports.getAllCategories = function(onDataReceived) {
  db.serialize(() => {
    db.all("SELECT * FROM category", (err, rows) => {
      if (err) {
        return onDataReceived(err);
      } else {
        onDataReceived(err, rows);
      }
    });
  });
};

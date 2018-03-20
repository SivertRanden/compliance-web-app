const dao = require("./db.js");

const db = dao.connection;

exports.getAllLaws = function(onDataReceived) {
  db.serialize(() => {
    db.each(
      "SELECT law_id as id, title as title, date_code as datecode FROM law",
      (err, row) => {
        if (err) {
          console.log(err.message);
        } else {
          onDataReceived(err, row);
        }
      }
    );
  });
};

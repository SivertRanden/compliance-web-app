const dao = require("./db.js");
const db = dao.connection;

exports.getAnswerById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get("SELECT * FROM answer WHERE answer_id = " + id, (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        onDataReceived(err, row);
      }
    });
  });
};

exports.getAnswersByCategoryId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all("SELECT * FROM answer WHERE category_id = " + id, (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        onDataReceived(err, rows);
      }
    });
  });
};

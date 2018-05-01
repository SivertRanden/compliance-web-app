const dao = require("./db.js");
const db = dao.connection;

exports.getAnswerById = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get("SELECT * FROM answer WHERE id_answer = ?", [id], (err, rows) => {
        if (err) {
          reject(err);
        } else if (!rows) {
          reject(new Error("ROWS"));
        } else {
          resolve(rows);
        }
      });
    });
  });
  return promise;
};

exports.getAnswersByCategoryId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all("SELECT * FROM answer WHERE category_id = ?", [id], (err, rows) => {
        if (err) {
          reject(err);
        } else if (!rows) {
          reject(new Error("ROWS"));
        } else {
          resolve(rows);
        }
      });
    });
  });
  return promise;
};

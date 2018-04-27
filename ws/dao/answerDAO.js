const dao = require("./db.js");
const db = dao.connection;

exports.getAnswerById = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get("SELECT * FROM answer WHERE id_answer = " + escape(id), (err, rows) => {
        if (err) {
          reject(err);
        } else if (!rows) {
          reject(new Error("INGEN ROWS"));
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
      db.all("SELECT * FROM answer WHERE category_id = " + escape(id), (err, rows) => {
        if (err) {
          reject(err);
        } else if (!rows) {
          reject(new Error("INGEN ROWS"));
        } else {
          resolve(rows);
        }
      });
    });
  });
  return promise;
};

exports.getAnswersByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT a.* FROM answer as a, themes_answers as ta WHERE (ta.theme_id = " +
          escape(id) +
          " AND a.id_answer = ta.answer_id)",
        (err, rows) => {
          if (err) {
            reject(err);
          } else if (!rows) {
            reject(new Error("INGEN ROWS"));
          } else {
            resolve(rows);
          }
        }
      );
    });
  });
  return promise;
};

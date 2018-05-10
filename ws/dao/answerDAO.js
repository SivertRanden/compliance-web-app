const dao = require("./db.js");
const db = dao.connection;

exports.getAnswerById = function(id) {
  let promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get(
        "SELECT c.title as category_title, a.* FROM answer as a, category as c WHERE a.id_answer = ? AND a.category_id = c.id_category",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else if (!rows) {
            reject(new Error("ROWS"));
          } else {
            resolve(rows);
          }
        }
      );
    });
  });
  return promise;
};

exports.getThemesByAnswerId = function(id) {
  let promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT t.* FROM theme as t, answer as a, themes_answers as ta WHERE a.id_answer = ? AND ta.answer_id = a.id_answer AND ta.theme_id = t.id_theme",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });
  return promise;
};

exports.getCategoryById = function(id) {
  let promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get("SELECT * FROM category WHERE id_category = ?", [id], (err, rows) => {
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
  let promise = new Promise(function(resolve, reject) {
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

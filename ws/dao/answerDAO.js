const dao = require("./db.js");
const db = dao.connection;

exports.getAnswerById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get("SELECT * FROM answer WHERE id_answer = " + id, (err, row) => {
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

exports.getAnswersByThemeId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT a.* FROM answer as a, themes_answers as ta WHERE (ta.theme_id = " +
        id +
        " AND a.id_answer = ta.answer_id)",
      (err, rows) => {
        if (err) {
          console.log(err.message);
        } else {
          onDataReceived(err, rows);
        }
      }
    );
  });
};

exports.getAnswersByCategoryIdAndThemeId = function(cId, tId, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT a.* FROM answer as a, themes_answers as ta WHERE (a.category_Id = " +
        cId +
        " AND ta.theme_id = " +
        tId +
        " AND a.id_answer = ta.answer_id)",
      (err, rows) => {
        if (err) {
          console.log(err.message);
        } else {
          onDataReceived(err, rows);
        }
      }
    );
  });
};

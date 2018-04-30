const dao = require("./db.js");
const db = dao.connection;

exports.getAllThemes = function() {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all("SELECT* from theme", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
  return promise;
};

exports.getThemeById = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get("SELECT * FROM theme WHERE id_theme = ?", [id], (err, rows) => {
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

exports.getLawsByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT l.* FROM law as l, theme as t, laws_sub_sections as ls, themes_sub_sections as ts WHERE t.id_theme = ? AND l.id_law = ls.law_id AND ls.sub_section_id = ts.sub_section_id AND ts.theme_id = t.id_theme",
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

exports.getRegulationsByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT r.* FROM regulation as r, theme as t, regulations_sub_sections as rs, themes_sub_sections as ts WHERE t.id_theme = ? AND r.id_regulation = rs.regulation_id AND ts.theme_id = t.id_theme AND rs.sub_section_id = ts.sub_section_id",
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

exports.getAnswersByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT a.* FROM answer as a, theme as t, themes_answers as ta WHERE t.id_theme = ? AND a.id_answer = ta.answer_id AND t.id_theme = ta.theme_id",
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

exports.getImplementationsByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT i.* FROM implementation as i, theme as t WHERE t.id_theme = ? AND t.id_theme = i.theme_id",
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

const dao = require("./db.js");

const db = dao.connection;

//Query the database for a subsections with a given ID.
exports.getSubsectionByID = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get(
        "SELECT * FROM sub_section as s WHERE s.id_sub_section = " + escape(id),
        (err, row) => {
          if (err || !row) {
            reject(new Error("DAO ERROR"));
          } else {
            resolve(row);
          }
        }
      );
    });
  });

  return promise;
};

//Query the database for the regulation connected to the subsection
//if there exists one.
exports.getRegulationBySubsectionId = function(id, onDataReceived) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT r.* FROM sub_section as s, regulation as r, regulations_sub_sections as rs WHERE s.id_sub_section = " +
          escape(id) +
          " AND rs.sub_section_id = s.id_sub_section AND rs.regulation_id = r.id_regulation",
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });

  return promise;
};

//Query the database for the law connected to the subsection
//if there exists one.
exports.getLawBySubsectionId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT l.* FROM sub_section as s, law as l, laws_sub_sections as ls WHERE s.id_sub_section = " +
          escape(id) +
          " AND ls.sub_section_id = s.id_sub_section AND ls.law_id = l.id_law",
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });

  return promise;
};

//Query the database for the theme connected to the subsection
exports.getThemesBySubsectionId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT t.* FROM theme as t, sub_section as s, themes_sub_sections as ts WHERE s.id_sub_section = " +
          escape(id) +
          " AND s.id_sub_section = ts.sub_section_id AND t.id_theme = ts.theme_id ",
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });

  return promise;
};

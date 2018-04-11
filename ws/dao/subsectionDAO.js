const dao = require("./db.js");

const db = dao.connection;

exports.getSubsectionByID = function(id, onDataReceived) {
  db.serialize(() => {
    db.get(
      "SELECT * FROM sub_section as s WHERE s.id_sub_section = " + id,
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

exports.getRegulationBySubsectionId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT r.* FROM sub_section as s, regulation as r, regulations_sub_sections as rs WHERE s.id_sub_section = " +
        id +
        " AND rs.sub_section_id = s.id_sub_section AND rs.regulation_id = r.id_regulation",
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

exports.getLawBySubsectionId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT l.* FROM sub_section as s, law as l, laws_sub_sections as ls WHERE s.id_sub_section = " +
        id +
        " AND ls.sub_section_id = s.id_sub_section AND ls.law_id = l.id_law",
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

exports.getThemesBySubsectionId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT t.short_title FROM theme as t, sub_section as s, themes_sub_sections as ts WHERE s.id_sub_section = " +
        id +
        " AND s.id_sub_section = ts.sub_section_id AND t.id_theme = ts.theme_id ",
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

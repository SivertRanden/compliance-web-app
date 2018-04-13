const dao = require("./db.js");

const db = dao.connection;

exports.getRegulationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get(
      "SELECT r.titleTest, r.date_code, l.title AS lawTitle, l.date_code AS lawCode FROM regulation AS r, law AS l, laws_regulations AS lr WHERE r.id_regulation = " +
        id +
        " AND l.id_law = lr.law_id AND r.id_regulation = lr.regulation_id",
      (err, rows) => {
        if (err) {
          //throw new Error("Det skjedde feil i spørringa");
          console.log("DARRI SE HER, EG ER INNI DEN GREIA HER LOL");
          return onDataReceived(new Error("Help me Obi-Wan Kenobi, you're our only hope"));
          //console.log(err.message);
        } else {
          let combinedRows = [];
          if (rows) {
            combinedRows.push(rows);
          }
          onDataReceived(err, combinedRows);
        }
      }
    );
  });
};

exports.getSubsectionsByRegulationId = function(id, combinedRows, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT s.* FROM regulation AS r, sub_section as s, regulations_sub_sections as rs WHERE rs.regulation_id = " +
        id +
        " AND r.id_regulation = rs.regulation_id AND s.id_sub_section = rs.sub_section_id",
      (err, rows) => {
        if (err) {
          console.log(err.message);
        } else {
          combinedRows.push(rows);
          onDataReceived(err, combinedRows);
        }
      }
    );
  });
};

const dao = require("./db.js");

const db = dao.connection;

exports.getRegulationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get(
      "SELECT r.title, r.date_code, l.title AS lawTitle FROM regulation AS r, law AS l, laws_regulations AS lr WHERE r.id_regulation = " +
        id +
        " AND l.id_law = lr.law_id AND r.id_regulation = lr.regulation_id",
      (err, rows) => {
        if (err) {
          console.log(err.message);
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
      "SELECT s.title AS subTitle, s.number AS subNumber, s.type AS subType, s.comment AS subComment FROM regulation AS r, sub_section as s, regulations_sub_sections as rs WHERE rs.regulation_id = " +
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

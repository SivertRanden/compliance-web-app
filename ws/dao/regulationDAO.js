const dao = require("./db.js");

const db = dao.connection;

exports.getRegulationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get(
      "SELECT r.title, r.date_code FROM regulation AS r WHERE r.id_regulation = " + id,
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
      "SELECT s.title AS subTitle, s.number AS subNumber, s.type AS subType FROM regulation AS r, sub_section as s, regulations_sub_sections as rs WHERE rs.regulation_id = " +
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

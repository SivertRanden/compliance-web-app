const dao = require("./db.js");

const db = dao.connection;

exports.getRegulationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get(
      "SELECT r.reg_title, r.date_code FROM regulation AS r WHERE r.regulation_id = " + id,
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
      "SELECT s.title AS subTitle, s.number AS subNumber, s.type AS subType FROM sub_section AS s WHERE s.regulation_id = " +
        id,
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

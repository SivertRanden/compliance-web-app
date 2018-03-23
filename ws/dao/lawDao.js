const dao = require("./db.js");
const db = dao.connection;

exports.getAllLaws = function(onDataReceived) {
  db.serialize(() => {
    db.all("SELECT * FROM law", (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        onDataReceived(err, rows);
      }
    });
  });
};

exports.getLawById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get("SELECT * FROM law WHERE law_id = " + id, (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        let combinedRows = [];
        if (row) {
          combinedRows.push(row);
        }
        onDataReceived(err, combinedRows);
      }
    });
  });
};

exports.getRegulationByLawId = function(id, combinedRows, onDataReceived) {
  db.serialize(() => {
    db.all(
      `SELECT r.title FROM regulation as r, law as l, laws_regulations as lr
      WHERE lr.law_id = ` + id + ` AND l.law_id = lr.law_id AND r.regulation_id = lr.regulation_id`,
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

exports.getSubsectionsByLawId = function(id, combinedRows, onDataReceived) {
  db.serialize(() => {
    db.all("SELECT * FROM sub_section WHERE law_id = " + id, combinedRows, (err, rows) => {
      if (err) {
        console.log(err.message);
      } else {
        combinedRows.push(rows);
        onDataReceived(err, combinedRows);
      }
    });
  });
};

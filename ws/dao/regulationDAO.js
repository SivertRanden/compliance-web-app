const dao = require("./db.js");

const db = dao.connection;

//Query the database for a regulation with a given ID and every
//regulation + subsection connected to that regulation
exports.getRegulationById = function(id, combinedRows /*, onDataReceived*/) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get(
        "SELECT r.title, r.date_code, l.title AS lawTitle, l.date_code AS lawCode FROM regulation AS r, law AS l, laws_regulations AS lr WHERE r.id_regulation = " +
          id +
          " AND l.id_law = lr.law_id AND r.id_regulation = lr.regulation_id",
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            //let combinedRows = [];
            combinedRows.push(rows);
            resolve(combinedRows);
          }
        }
      );
    });
  });

  return promise;
  /*db.serialize(() => {
    db.get(
      "SELECT r.title, r.date_code, l.title AS lawTitle, l.date_code AS lawCode FROM regulation AS r, law AS l, laws_regulations AS lr WHERE r.id_regulation = " +
        id +
        " AND l.id_law = lr.law_id AND r.id_regulation = lr.regulation_id",
      (err, rows) => {
        if (err) {
          return onDataReceived(err);
        } else {
          let combinedRows = [];
          if (rows) {
            combinedRows.push(rows);
          }
          onDataReceived(err, combinedRows);
        }
      }
    );
  }); */
};

exports.getSubsectionsByRegulationId = function(id, combinedRows /*, onDataReceived*/) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT s.* FROM regulation AS r, sub_section as s, regulations_sub_sections as rs WHERE rs.regulation_id = " +
          id +
          " AND r.id_regulation = rs.regulation_id AND s.id_sub_section = rs.sub_section_id",
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            combinedRows.push(rows);
            resolve(rows);
          }
        }
      );
    });
  });

  return promise;

  /*db.serialize(() => {
    db.all(
      "SELECT s.* FROM regulation AS r, sub_section as s, regulations_sub_sections as rs WHERE rs.regulation_id = " +
        id +
        " AND r.id_regulation = rs.regulation_id AND s.id_sub_section = rs.sub_section_id",
      (err, rows) => {
        if (err) {
          return onDataReceived(err);
        } else {
          combinedRows.push(rows);
          onDataReceived(err, combinedRows);
        }
      }
    );
  }); */
};

const dao = require("./db.js");

const db = dao.connection;

//Query the database for a regulation with a given ID.
exports.getRegulationById = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get("SELECT r.* FROM regulation AS r WHERE r.id_regulation = ?", [id], (err, rows) => {
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

//Query the database for the laws connected to the regulation
exports.getLawByRegulationId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get(
        "SELECT l.* FROM law AS l, regulation AS r, laws_regulations AS lr WHERE r.id_regulation = ? AND lr.law_id = l.id_law AND lr.regulation_id = r.id_regulation",
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

//Query the database for the subsections connected to the regulation.
exports.getSubsectionsByRegulationId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT s.* FROM regulation AS r, sub_section as s, regulations_sub_sections as rs WHERE rs.regulation_id = ? AND r.id_regulation = rs.regulation_id AND s.id_sub_section = rs.sub_section_id",
        [id],
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

const dao = require("./db.js");
const db = dao.connection;

exports.getAllLaws = function() {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all("SELECT * FROM law", (err, rows) => {
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

exports.getLawById = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.get("SELECT * FROM law WHERE id_law = " + escape(id), (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error("ROWS"));
        } else {
          resolve(row);
        }
      });
    });
  });
  return promise;
};

exports.getRegulationByLawId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        `SELECT r.* FROM regulation as r, law as l, laws_regulations as lr
      WHERE lr.law_id = ` +
          escape(id) +
          ` AND l.id_law = lr.law_id AND r.id_regulation = lr.regulation_id`,
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

exports.getSubsectionsByLawId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT s.* FROM sub_section as s, law as l, laws_sub_sections AS ls WHERE l.id_law = " +
          escape(id) +
          " AND l.id_law = ls.law_id AND s.id_sub_section = ls.sub_section_id",
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

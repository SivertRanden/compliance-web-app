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
        onDataReceived(err, row);
      }
    });
  });
};

exports.getRegulationByLawId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      `SELECT r.title FROM regulation as r, law as l, laws_regulations as lr
      WHERE lr.law_id = ` +
        id +
        ` AND l.id_law = lr.law_id AND r.id_regulation = lr.regulation_id`,
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

exports.getSubsectionsByLawId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT s.title AS subTitle, s.number AS subNumber, s.type AS subType FROM sub_section as s, law as l, laws_sub_sections AS ls WHERE l.id_law = " +
        id +
        " AND l.id_law = ls.law_id AND s.id_sub_section = ls.sub_section_id",
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

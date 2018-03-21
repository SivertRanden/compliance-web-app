const dao = require("./db.js");

const db = dao.connection;

exports.getRegulationById = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT r.reg_title, r.date_code, s.title, s.number, s.type FROM regulation AS r, sub_section AS s WHERE r.regulation_id = " +
        id +
        " AND s.regulation_id = r.regulation_id",
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

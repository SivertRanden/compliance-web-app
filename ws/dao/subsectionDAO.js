const dao = require("./db.js");

const db = dao.connection;

exports.getSubsectionByID = function(id, onDataReceived) {
  db.serialize(() => {
    db.get(
      "SELECT s.*, l.title as lawtitle, r.title as regtitle FROM sub_section as s, law as l, regulation as r, regulations_sub_sections as rs, laws_sub_sections as ls  WHERE s.id_sub_section = " +
        id +
        " AND ((rs.sub_section_id = s.id_sub_section AND rs.regulation_id = r.id_regulation ) OR (ls.sub_section_id = s.id_sub_section AND ls.law_id = l.id_law))",
      (err, row) => {
        if (err) {
          console.log(err.message);
        } else {
          onDataReceived(err, row);
        }
      }
    );
  });
};

exports.getSubsectionbyTheme = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      "SELECT s.number, s.title as subtitle, s.comment, s.type, s.regulation_id, s.law_id, r.title as regtitle, l.title as lawtitle FROM themes_sub_sections as ts, sub_section as s, law as l, regulation as r WHERE (s.law_id = l.law_id OR s.regulation_id = r.regulation_id) AND s.sub_section_id = " +
        id,
      (err, row) => {
        if (err) {
          console.log(err.message);
        } else {
          onDataReceived(err, row);
        }
      }
    );
  });
};

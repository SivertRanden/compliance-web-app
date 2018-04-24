const dao = require("./db.js");
const db = dao.connection;

exports.getAllThemes = function(onDataReceived) {
  db.serialize(() => {
    db.all("SELECT * FROM theme", (err, rows) => {
      if (err) {
        return onDataReceived(err);
      } else {
        onDataReceived(err, rows);
      }
    });
  });
};

exports.getThemeById = function(id, onDataReceived) {
  db.serialize(() => {
    db.get("SELECT * FROM theme WHERE id_theme = " + escape(id), (err, row) => {
      if (err) {
        return onDataReceived(err);
      } else {
        onDataReceived(err, row);
      }
    });
  });
};

exports.getLawsByThemeId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      `SELECT l.title, l.date_code FROM law as l, theme as t, laws_sub_sections as ls, themes_sub_sections as ts
      WHERE t.id_theme = ` +
        escape(id) +
        ` AND l.id_law = ls.law_id AND ls.sub_section_id = ts.sub_section_id AND ts.theme_id = t.id_theme`,
      (err, rows) => {
        if (err) {
          return onDataReceived(err);
        } else {
          onDataReceived(err, rows);
        }
      }
    );
  });
};

exports.getRegulationsByThemeId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      `SELECT r.title, r.date_code FROM regulation as r, theme as t, regulations_sub_sections as rs, themes_sub_sections as ts
      WHERE t.id_theme = ` +
        escape(id) +
        ` AND r.id_regulation = rs.regulation_id AND ts.theme_id = t.id_theme AND rs.sub_section_id = ts.sub_section_id`,
      (err, rows) => {
        if (err) {
          return onDataReceived(err);
        } else {
          onDataReceived(err, rows);
        }
      }
    );
  });
};

exports.getAnswersByThemeId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      `SELECT a.title, a.status FROM answer as a, theme as t, themes_answers as ta
      WHERE t.id_theme = ` +
        escape(id) +
        ` AND a.id_answer = ta.answer_id AND t.id_theme = ta.theme_id;`,
      (err, rows) => {
        if (err) {
          return onDataReceived(err);
        } else {
          onDataReceived(err, rows);
        }
      }
    );
  });
};

exports.getImplementationsByThemeId = function(id, onDataReceived) {
  db.serialize(() => {
    db.all(
      `SELECT i.* FROM implementation as i, theme as t
      WHERE t.id_theme = ` +
        escape(id) +
        ` AND t.id_theme = i.theme_id`,
      (err, rows) => {
        if (err) {
          return onDataReceived(err);
        } else {
          onDataReceived(err, rows);
        }
      }
    );
  });
};

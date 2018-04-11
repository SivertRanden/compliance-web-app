const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = function(req, res) {
  answerDao.getAnswerById(req.params.answerId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("Svar med angitt id finnes ikke.");
    } else {
      res.json(row);
    }
  });
};

exports.getAnswersByParameter = function(req, res) {
  if (req.query.categoryId && !req.query.themeId) {
    answerDao.getAnswersByCategoryId(req.query.categoryId, (err, rows) => {
      if (err) {
        res.sendStatus(500);
      }
      if (!rows) {
        res.send("Det finnes ingen svar i aktuell kategori.");
      } else {
        res.json(rows);
      }
    });
  } else if (req.query.themeId && !req.query.categoryId) {
    answerDao.getAnswersByThemeId(req.query.themeId, (err, rows) => {
      if (err) {
        res.sendStatus(500);
      }
      if (!rows) {
        res.send("Det finnes ingen svar i aktuelt tema.");
      } else {
        res.json(rows);
      }
    });
  } else {
    res.send("Det finnes ingen data med angitt parameter.");
  }
};

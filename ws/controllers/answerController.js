const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = function(req, res) {
  answerDao
    .getAnswerById(req.params.answerId)
    .then(function(rows) {
      res.json(rows);
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    });
};

exports.getAnswersByParameter = function(req, res) {
  if (req.query.categoryId && !req.query.themeId) {
    answerDao
      .getAnswersByCategoryId(req.query.categoryId)
      .then(function(rows) {
        if (rows) {
          res.send("Det finnes ingen svar i aktuell kategori.");
          return;
        } else {
          res.json(rows);
        }
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err.message);
        return;
      });
  } else if (req.query.themeId && !req.query.categoryId) {
    answerDao
      .getAnswersByThemeId(req.query.themeId)
      .then(function(rows) {
        if (!rows) {
          res.send("Det finnes ingen svar i aktuelt tema");
          return;
        } else {
          res.json(rows);
        }
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err.message);
        return;
      });
  } else {
    res.sendStatus(404);
  }
};

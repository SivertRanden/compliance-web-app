const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = function(req, res) {
  answerDao.getAnswerById(req.params.answerId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("Svar med oppgitt id finnes ikke.");
    } else {
      res.json(row);
    }
  });
};

exports.getAnswersByCategory = function(req, res) {
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
};

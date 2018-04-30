const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = async function(req, res) {
  try {
    let row = await answerDao.getAnswerById(req.params.answerId);
    res.json(row);
  } catch (err) {
    res.sendStatus(404);
    console.log(err.message);
  }
  return;
};

//DETTE MÅ FIKSES NÅR EG GIDDER!!!
exports.getAnswersByParameter = function(req, res) {
  if (req.query.categoryId && !req.query.themeId) {
    answerDao
      .getAnswersByCategoryId(req.query.categoryId)
      .then(function(rows) {
        if (!rows) {
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

const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = async function(req, res) {
  try {
    let row = await answerDao.getAnswerById(req.params.answerId);
    res.json(row);
  } catch (err) {
    if (err.message === "INGEN ROWS") {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
    console.log(err.message);
  }
  return;
};

exports.getAnswersByParameter = async function(req, res) {
  if (req.query.categoryId && !req.query.themeId) {
    try {
      let rows = await answerDao.getAnswersByCategoryId(req.query.categoryId);
      res.json(rows);
    } catch (err) {
      res.sendStatus(500);
      console.log(err.message);
    }
  } else if (req.query.themeId && !req.query.categoryId) {
    try {
      let rows = await answerDao.getAnswersByThemeId(req.query.themeId);
      res.json(rows);
    } catch (err) {
      res.sendStatus(500);
      console.log(err.message);
    }
  } else {
    res.sendStatus(404);
  }
  return;
};

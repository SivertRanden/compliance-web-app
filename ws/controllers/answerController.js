const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = async function(req, res) {
  let combinedRows = [];
  try {
    combinedRows.push(await answerDao.getAnswerById(req.params.answerId));
    combinedRows.push(await answerDao.getThemesByAnswerId(req.params.answerId));
    res.json(combinedRows);
  } catch (err) {
    if (err.message === "ROWS") {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
    console.log(err.message);
  }
  return;
};

exports.getAnswersByCategoryId = async function(req, res) {
  let combinedRows = [];
  try {
    combinedRows.push(await answerDao.getCategoryById(req.params.categoryId));
    combinedRows.push(await answerDao.getAnswersByCategoryId(req.params.categoryId));
    res.json(combinedRows);
  } catch (err) {
    if (err.message === "ROWS") {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
    console.log(err.message);
  }
  return;
};

const answerDao = require("./../dao/answerDAO.js");

exports.getAnswer = async function(req, res) {
  try {
    let rows = await answerDao.getAnswerById(req.params.answerId);
    res.json(rows);
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
  try {
    let rows = await answerDao.getAnswersByCategoryId(req.params.categoryId);
    res.json(rows);
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

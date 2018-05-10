const categoryDao = require("./../dao/categoryDAO.js");
const answerController = require("./answerController.js");

exports.getCategories = async function(req, res) {
  try {
    let row = await categoryDao.getAllCategories();
    res.json(row);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
  return;
};

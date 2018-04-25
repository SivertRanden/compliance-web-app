const categoryDao = require("./../dao/categoryDAO.js");

exports.getCategories = async function(req, res) {
  try {
    let row = await categoryDao.getAllCategories();
    res.json(row);
  } catch (err) {
    res.sendStatus(404);
    console.log(err.message);
  }
  return;
};

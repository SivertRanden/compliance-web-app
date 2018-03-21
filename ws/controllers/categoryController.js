const categoryDao = require("./../dao/categoryDAO.js");

exports.getCategories = function(req, res) {
  categoryDao.getAllCategories((err, rows) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

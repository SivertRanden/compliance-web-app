const categoryDao = require("./../dao/categoryDAO.js");

exports.getCategories = function(req, res) {
  categoryDao
    .getAllCategories()
    .then(function(rows) {
      res.json(rows);
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    });
};

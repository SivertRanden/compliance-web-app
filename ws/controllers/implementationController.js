const implementationDao = require("./../dao/implementationDAO.js");

exports.getImplementation = function(req, res) {
  implementationDao.getImplementationById(req.params.implementationId, (err, row) => {
    if (err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    }
    if (!row) {
      res.sendStatus(404);
    } else {
      res.json(row);
    }
  });
};

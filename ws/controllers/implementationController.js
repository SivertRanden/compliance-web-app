const implementationDao = require("./../dao/implementationDAO.js");

exports.getImplementation = function(req, res) {
  implementationDao.getImplementationById(req.params.implementationId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("Svar med angitt id finnes ikke.");
    } else {
      res.json(row);
    }
  });
};

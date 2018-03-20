const lawDao = require("./../dao/lawDao.js");

exports.getLaws = function(req, res) {
  lawDao.getAllLaws((err, row) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(row);
    }
  });
};

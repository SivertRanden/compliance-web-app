const lawDao = require("./../dao/lawDao.js");

exports.getLaws = function(req, res) {
  lawDao.getAllLaws((err, rows) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

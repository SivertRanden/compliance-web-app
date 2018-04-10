const lawDao = require("./../dao/lawDAO.js");

exports.getLaws = function(req, res) {
  lawDao.getAllLaws((err, rows) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

exports.getLaw = function(req, res) {
  lawDao.getLawById(req.params.lawId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("UFFAMEIEN DENNA LOVEN FINNES IKKE LOL");
    } else {
      res.json(row);
    }
  });
};

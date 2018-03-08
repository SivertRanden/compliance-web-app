const dalc = require("./../dao");

exports.getLaws = function(req, res) {
  dalc.getLaws(function(err, rows) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

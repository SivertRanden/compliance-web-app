const regulationDao = require("./../dao/regulationDAO.js");

exports.getRegulation = function(req, res) {
  regulationDao.getRegulationById(req.params.regulation_id, (err, rows) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!rows) {
      res.send("UFFAMEIEN DENNA FORSKRIFTEN FINNES IKKE LOL");
    } else {
      res.json(rows);
    }
  });
};

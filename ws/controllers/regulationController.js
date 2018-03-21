const regulationDao = require("./../dao/regulationDAO.js");

exports.getRegulation = function(req, res) {
  regulationDao.getRegulationById(req.params.regulation_id, (err, combinedRows) => {
    if (err) {
      res.sendStatus(500);
    }
    if (combinedRows.length === 0) {
      res.send("UFFAMEIEN DENNA FORSKRIFTEN FINNES IKKE LOL");
    } else {
      regulationDao.getSubsectionsByRegulationId(
        req.params.regulation_id,
        combinedRows,
        (err, combinedRows) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json(combinedRows);
          }
        }
      );
    }
  });
};

const callback = function(req, res, rows) {
  res.json(rows);
};

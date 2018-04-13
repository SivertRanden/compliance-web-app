const regulationDao = require("./../dao/regulationDAO.js");

exports.getRegulation = function(req, res) {
  regulationDao.getRegulationById(req.params.regulation_id, (err, combinedRows) => {
    if (err) {
      res.sendStatus(503);
      console.log(err.message);
      return;
    }
    if (combinedRows.length === 0) {
      res.sendStatus(404);
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

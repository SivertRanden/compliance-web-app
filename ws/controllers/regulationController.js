const regulationDao = require("./../dao/regulationDAO.js");

//Show a regulation with a given ID + every
//subsection and law connected with that regulation

//NU SKAL EG FAEN MEG GÅ HELT MONGO HER
exports.getRegulation = function(req, res) {
  regulationDao.getRegulationById(req.params.regulation_id, (err, combinedRows) => {
    if (err) {
      res.sendStatus(500);
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

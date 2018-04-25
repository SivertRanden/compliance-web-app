const regulationDao = require("./../dao/regulationDAO.js");

//Show a regulation with a given ID + every
//subsection and law connected with that regulation
exports.getRegulation = function(req, res) {
  let combinedRows = [];
  regulationDao
    .getRegulationById(req.params.regulation_id)
    .then(function(rows) {
      combinedRows.push(rows);
    })
    .then(
      regulationDao.getSubsectionsByRegulationId(req.params.regulation_id).then(function(rows) {
        combinedRows.push(rows);
        res.json(combinedRows);
      })
    )
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    });
};

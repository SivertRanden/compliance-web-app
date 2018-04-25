const subsectionDAO = require("./../dao/subsectionDAO.js");

//Show a regulation with a given ID + connected theme and law/regulation
exports.getSubsection = function(req, res) {
  let combinedRows = [];
  subsectionDAO
    .getSubsectionByID(req.params.subsectionId)
    .then(function(rows) {
      combinedRows.push(rows);
    })
    .then(
      subsectionDAO.getLawBySubsectionId(req.params.subsectionId).then(function(rows) {
        combinedRows.push(rows);
      })
    )
    .then(
      subsectionDAO.getRegulationBySubsectionId(req.params.subsectionId).then(function(rows) {
        combinedRows.push(rows);
      })
    )
    .then(
      subsectionDAO.getThemesBySubsectionId(req.params.subsectionId).then(function(rows) {
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

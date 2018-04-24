const lawDao = require("./../dao/lawDAO.js");

//Gets all laws and sends all rows in response with JSON
exports.getLaws = function(req, res) {
  lawDao
    .getAllLaws()
    .then(function(rows) {
      res.json(rows);
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    });
};

//Gets the law with corresponding id, regulations with corresponding law id
//and subsections with corresponding id
exports.getLaw = function(req, res) {
  let combinedRows = [];
  lawDao
    .getLawById(req.params.lawId)
    .then(function(rows) {
      combinedRows.push(rows);
    })
    .then(lawDao.getRegulationByLawId(req.params.lawId))
    .then(function(rows) {
      combinedRows.push(rows);
    })
    .then(lawDao.getSubsectionsByLawId(req.params.lawId))
    .then(function(rows) {
      combinedRows.push(rows);
      res.json(combinedRows);
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    });
};

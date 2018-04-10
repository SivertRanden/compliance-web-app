const lawDao = require("./../dao/lawDAO.js");

//Gets all laws and sends all rows in response with JSON
exports.getLaws = function(req, res) {
  lawDao.getAllLaws((err, rows) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

<<<<<<< HEAD
//Gets the law with corresponding id, regulations with corresponding law id
//and subsections with corresponding id
exports.getLaw = function(req, res) {
  lawDao.getLawById(req.params.lawId, (err, combinedRows) => {
    if (err) {
      res.sendStatus(500);
    }
    if (combinedRows.length === 0) {
      res.send("UFFAMEIEN DENNA LOVEN FINNES IKKE LOL");
    } else {
      lawDao.getRegulationByLawId(
        req.params.lawId,
        combinedRows,
        (err, combinedRows) => {
          if (err) {
            res.sendStatus(500);
          } else {
            lawDao.getSubsectionsByLawId(
              req.params.lawId,
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
        }
      );
=======
exports.getLaw = function(req, res) {
  lawDao.getLawById(req.params.lawId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("UFFAMEIEN DENNA LOVEN FINNES IKKE LOL");
    } else {
      res.json(row);
>>>>>>> feature/subsections
    }
  });
};

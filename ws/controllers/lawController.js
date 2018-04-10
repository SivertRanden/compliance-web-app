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

//Gets the law with corresponding id, regulations with corresponding law id
//and subsections with corresponding id
exports.getLaw = function(req, res) {
  let combinedRows = [];
  lawDao.getLawById(req.params.lawId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("UFFAMEIEN DENNA LOVEN FINNES IKKE LOL");
    } else {
      combinedRows.push(row);
      lawDao.getRegulationByLawId(req.params.lawId, (err, rows) => {
        if (err) {
          res.sendStatus(500);
        } else {
          combinedRows.push(rows);
          lawDao.getSubsectionsByLawId(req.params.lawId, (err, rows) => {
            if (err) {
              res.sendStatus(500);
            } else {
              combinedRows.push(rows);
              res.json(combinedRows);
            }
          });
        }
      });
    }
  });
};

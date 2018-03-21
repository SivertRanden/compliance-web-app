const lawDao = require("./../dao/lawDao.js");

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
  lawDao.getLawById(req.params.lawId, (err, combinedRows) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!combinedRows) {
      res.send("UFFAMEIEN DENNA LOVEN FINNES IKKE LOL");
    } else {
      lawDao.getRegulationByLawId(
        req.params.lawid,
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

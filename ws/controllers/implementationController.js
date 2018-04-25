const implementationDao = require("./../dao/implementationDAO.js");

//SE PÅ BRUKEN AV IF-SETNINGEN HER! DET VAR LITT STØGT
exports.getImplementation = function(req, res) {
  let combinedRows = [];
  if (req.query.themeId) {
    implementationDao
      .getImplementationByThemeId(req.query.themeId)
      .then(function(rows) {
        combinedRows.push(rows);
      })
      .then(
        implementationDao.getKeyPersonsByThemeId(req.query.themeId).then(function(rows) {
          combinedRows.push(rows);
        })
      )
      .then(
        implementationDao.getTrainingPersonsByThemeId(req.query.themeId).then(function(rows) {
          combinedRows.push(rows);
          res.json(combinedRows);
        })
      )
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err.message);
        return;
      });
  } else {
    res.sendStatus(404);
    return;
  }
};

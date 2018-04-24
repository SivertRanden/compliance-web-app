const implementationDao = require("./../dao/implementationDAO.js");

exports.getImplementation = function(req, res) {
  let combinedRows = [];
  implementationDao
    .getImplementationByThemeId(req.query.themeId)
    .then(function(rows) {
      combinedRows.push(rows);
    })
    .then(
      implementationDao
        .getKeyPersonsByThemeId(req.query.themeId)
        .then(function(rows) {
          combinedRows.push(rows);
        })
        .then(
          implementationDao
            .getTrainingPersonsByThemeId(req.query.themeId)
            .then(function(rows) {
              combinedRows.push(rows);
              res.json(combinedRows);
            })
            .catch(function(err) {
              res.sendStatus(500);
              concole.log(err.message);
              return;
            })
        )
    );
};

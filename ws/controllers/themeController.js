const themeDAO = require("./../dao/themeDAO.js");

//Gets all themes and sends all rows in response with JSON
exports.getThemes = function(req, res) {
  themeDAO
    .getAllThemes()
    .then(function(rows) {
      res.json(rows);
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    });
};

//Gets theme by id, also gets associated laws, regulations, answers and implementations
exports.getThemeById = function(req, res) {
  const themeId = req.params.themeId;
  let combinedRows = [];

  themeDAO
    .getThemeById(themeId)
    .then(function(rows) {
      combinedRows.push(rows);
    })
    .then(
      themeDAO
        .getLawsByThemeId(themeId)
        .then(function(rows) {
          combinedRows.push(rows);
        })
        .then(
          themeDAO
            .getRegulationsByThemeId(themeId)
            .then(function(rows) {
              combinedRows.push(rows);
            })
            .then(
              themeDAO
                .getAnswersByThemeId(themeId)
                .then(function(rows) {
                  combinedRows.push(rows);
                })
                .then(
                  themeDAO
                    .getImplementationsByThemeId(themeId)
                    .then(function(rows) {
                      combinedRows.push(rows);
                      res.json(combinedRows);
                    })
                    .catch(function(err) {
                      res.sendStatus(500);
                      console.log(err.message);
                      return;
                    })
                )
            )
        )
    );
};

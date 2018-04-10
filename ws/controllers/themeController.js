const themeDAO = require("./../dao/themeDAO.js");

//Gets all themes and sends all rows in response with JSON
exports.getThemes = function(req, res) {
  themeDAO.getAllThemes((err, rows) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
};

//Gets theme by id, also gets associated laws, regulations, answers and implementations
exports.getThemeById = function(req, res) {
  const themeId = req.params.themeId;
  let combinedRows = [];
  themeDAO.getThemeById(themeId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("UFFAMEIEN DETTE TEMAET FINNES IKKE LOL!");
    } else {
      combinedRows.push(row);
      themeDAO.getLawsByThemeId(themeId, (err, rows) => {
        if (err) {
          res.sendStatus(500);
        } else {
          combinedRows.push(rows);
          themeDAO.getRegulationsByThemeId(themeId, (err, rows) => {
            if (err) {
              res.sendStatus(500);
            }
            combinedRows.push(rows);
            themeDAO.getAnswersByThemeId(themeId, (err, rows) => {
              if (err) {
                res.sendStatus(500);
              }
              combinedRows.push(rows);
              themeDAO.getImplementationsByThemeId(themeId, (err, rows) => {
                if (err) {
                  res.sendStatus(500);
                }
                combinedRows.push(rows);
                res.json(combinedRows);
              });
            });
          });
        }
      });
    }
  });
};

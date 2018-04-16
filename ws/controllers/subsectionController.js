const subsectionDAO = require("./../dao/subsectionDAO.js");

exports.getSubsection = function(req, res) {
  let combinedRows = [];
  subsectionDAO.getSubsectionByID(req.params.subsectionId, (err, row) => {
    if (err) {
      res.sendStatus(500);
      console.log(err.message);
      return;
    }
    if (!row) {
      res.sendStatus(404);
    } else {
      combinedRows.push(row);
      subsectionDAO.getRegulationBySubsectionId(req.params.subsectionId, (err, rows) => {
        if (err) {
          res.sendStatus(500);
          console.log(err.message);
          return;
        } else {
          combinedRows.push(rows);
          subsectionDAO.getLawBySubsectionId(req.params.subsectionId, (err, rows) => {
            if (err) {
              res.sendStatus(500);
              console.log(err.message);
              return;
            } else {
              combinedRows.push(rows);
              subsectionDAO.getThemesBySubsectionId(req.params.subsectionId, (err, rows) => {
                if (err) {
                  res.sendStatus(500);
                  console.log(err.message);
                  return;
                } else {
                  combinedRows.push(rows);
                  res.json(combinedRows);
                }
              });
            }
          });
        }
      });
    }
  });
};

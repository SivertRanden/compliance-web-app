const regulationDao = require("./../dao/regulationDAO.js");

//Show a regulation with a given ID + every
//subsection and law connected with that regulation

//NU SKAL EG FAEN MEG GÅ HELT MONGO HER
exports.getRegulation = function(req, res) {
  let combinedRows = [];
  regulationDao
    .getRegulationById(req.params.regulation_id, combinedRows)
    .then(function(combinedRows) {
      console.log(combinedRows.length);
    })
    .then(
      regulationDao
        .getSubsectionsByRegulationId(req.params.regulation_id, combinedRows)
        .then(function(combinedRows) {
          console.log(combinedRows.length);
        })
        .catch(function(err) {
          console.log(err.message);
          return;
        })
    );
};

/* 
    .then(function(combinedRows) {
      //combinedRows.push(rows);
      res.json(combinedRows);
      console.log("SUG EN HESTEKUKK");
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log("FØKK MY LIFE");
      return;
    })
    .then(
      regulationDao
        .getSubsectionsByRegulationId(req.params.regulation_id, combinedRows)
        .then(function(combinedRows) {
          //combinedRows.push(rows);
          //console.log(combinedRows.length);
          res.json(combinedRows);
          console.log("SUG PIKK");
        })
        .catch(function(err) {
          res.sendStatus(500);
          console.log(err.message);
          return;
        })
    )
    .catch(function(err) {
      console.log(err.message);
    }); */

const regulationDao = require("./../dao/regulationDAO.js");

//Show a regulation with a given ID + every
//subsection and law connected with that regulation
exports.getRegulation = async function(req, res) {
  let combinedRows = [];

  try {
    combinedRows.push(await regulationDao.getRegulationById(req.params.regulation_id));
    combinedRows.push(await regulationDao.getSubsectionsByRegulationId(req.params.regulation_id));
    res.json(combinedRows);
  } catch (err) {
    if (!rows) {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
    console.log(err.message);
  }

  return;
};

const subsectionDAO = require("./../dao/subsectionDAO.js");

//Show a regulation with a given ID + connected theme and law/regulation
exports.getSubsection = async function(req, res) {
  let combinedRows = [];
  const subId = req.params.subsectionId;

  try {
    combinedRows.push(await subsectionDAO.getSubsectionByID(subId));
    combinedRows.push(await subsectionDAO.getLawBySubsectionId(subId));
    combinedRows.push(await subsectionDAO.getRegulationBySubsectionId(subId));
    combinedRows.push(await subsectionDAO.getThemesBySubsectionId(subId));
    res.json(combinedRows);
  } catch (err) {
    if (err.message === "ROWS") {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
    console.log(err.message);
  }
  return;
};

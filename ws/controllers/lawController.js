const lawDao = require("./../dao/lawDAO.js");

//Gets all laws and sends all rows in response with JSON
exports.getLaws = async function(req, res) {
  try {
    let rows = await lawDao.getAllLaws();
    res.json(rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
  return;
};

//Gets the law with corresponding id, regulations with corresponding law id
//and subsections with corresponding id
exports.getLaw = async function(req, res) {
  let combinedRows = [];
  const lawId = req.params.lawId;

  try {
    combinedRows.push(await lawDao.getLawById(lawId));
    combinedRows.push(await lawDao.getRegulationByLawId(lawId));
    combinedRows.push(await lawDao.getSubsectionsByLawId(lawId));
    res.json(combinedRows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
  return;
};

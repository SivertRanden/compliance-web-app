const themeDAO = require("./../dao/themeDAO.js");

//Gets all themes and sends all rows in response with JSON
exports.getThemes = async function(req, res) {
  try {
    let rows = await themeDAO.getAllThemes();
    res.json(rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
  return;
};

//Gets theme by id. Also gets associated laws, regulations, answers and implementation
exports.getThemeById = async function(req, res) {
  const themeId = req.params.themeId;
  let combinedRows = [];

  try {
    combinedRows.push(await themeDAO.getThemeById(themeId));
    combinedRows.push(await themeDAO.getLawsByThemeId(themeId));
    combinedRows.push(await themeDAO.getRegulationsByThemeId(themeId));
    combinedRows.push(await themeDAO.getAnswersByThemeId(themeId));
    combinedRows.push(await themeDAO.getImplementationByThemeId(themeId));
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

exports.getSubsectionsAndRegulationsByThemeIdAndLawId = async function(req, res) {
  const themeId = req.params.themeId;
  const lawId = req.params.lawId;
  let combinedRows = [];

  try {
    combinedRows.push(await themeDAO.getRegulationsByThemeIdAndLawId(themeId, lawId));
    combinedRows.push(await themeDAO.getSubsectionsByThemeIdAndLawId(themeId, lawId));
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

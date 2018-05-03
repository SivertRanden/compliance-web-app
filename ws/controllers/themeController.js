const themeDAO = require("./../dao/themeDAO.js");
const implementationDAO = require("./../dao/implementationDAO.js");
const lawDAO = require("./../dao/lawDAO");

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
    combinedRows.push(await implementationDAO.getImplementationByThemeId(themeId));
    combinedRows.push(await implementationDAO.getKeyPersonsByThemeId(themeId));
    combinedRows.push(await implementationDAO.getTrainingPersonsByThemeId(themeId));
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

exports.getImplementationByThemeId = async function(req, res) {
  const themeId = req.params.themeId;
  let combinedRows = [];

  try {
    combinedRows.push(await implementationDAO.getImplementationByThemeId(themeId));
    combinedRows.push(await implementationDAO.getKeyPersonsByThemeId(themeId));
    combinedRows.push(await implementationDAO.getTrainingPersonsByThemeId(themeId));
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

exports.getSubSectionsAndRegulationsByThemeIdAndLawId = async function(req, res) {
  const themeId = req.params.themeId;
  const lawId = req.params.lawId;
  let combinedRows = [];

  try {
    combinedRows.push(await themeDAO.getThemeById(themeId));
    combinedRows.push(await lawDAO.getLawById(lawId));
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

exports.getLawsAndSubSectionsByThemeIdAndRegulationId = async function(req, res) {
  const themeId = req.params.themeId;
  const regulationId = req.params.regulationId;
  let combinedRows = [];

  try {
    combinedRows.push(await themeDAO.getLawsByThemeIdAndRegulationId(themeId, regulationId));
    combinedRows.push(await themeDAO.getSubSectionsByThemeIdAndRegulationId(themeId, regulationId));
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

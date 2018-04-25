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

//Gets theme by id, also gets associated laws, regulations, answers and implementations
exports.getThemeById = async function(req, res) {
  const themeId = req.params.themeId;
  let combinedRows = [];

  try {
    combinedRows.push(await themeDAO.getThemeById(themeId));
    combinedRows.push(await themeDAO.getLawsByThemeId(themeId));
    combinedRows.push(await themeDAO.getRegulationsByThemeId(themeId));
    combinedRows.push(await themeDAO.getAnswersByThemeId(themeId));
    combinedRows.push(await themeDAO.getImplementationsByThemeId(themeId));
    res.json(combinedRows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
  return;
};

const implementationDao = require("./../dao/implementationDAO.js");

//SE PÅ BRUKEN AV IF-SETNINGEN HER! DET VAR LITT STØGT
exports.getImplementation = async function(req, res) {
  let combinedRows = [];

  if (req.query.themeId) {
    const themeId = req.query.themeId;
    try {
      combinedRows.push(await implementationDao.getImplementationByThemeId(themeId));
      combinedRows.push(await implementationDao.getKeyPersonsByThemeId(themeId));
      combinedRows.push(await implementationDao.getTrainingPersonsByThemeId(themeId));
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
  } else {
    res.sendStatus(404);
    return;
  }
};

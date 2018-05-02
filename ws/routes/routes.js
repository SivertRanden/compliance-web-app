module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  const regulationController = require("../controllers/regulationController");
  const categoryController = require("../controllers/categoryController");
  const answerController = require("../controllers/answerController");
  const subsectionController = require("../controllers/subsectionController");
  const themeController = require("../controllers/themeController");

  //Laws
  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);

  //Regulations
  app.route("/regulations/:regulation_id").get(regulationController.getRegulation);

  //Subsections
  app.route("/subsections/:subsectionId").get(subsectionController.getSubsection);

  //Categories
  app.route("/categories").get(categoryController.getCategories);
  app.route("/categories/:categoryId/answers").get(answerController.getAnswersByCategoryId);

  //Answers
  app.route("/answers/:answerId").get(answerController.getAnswer);

  //Themes
  app.route("/themes").get(themeController.getThemes);
  app.route("/themes/:themeId").get(themeController.getThemeById);
  app
    .route("/themes/:themeId/laws/:lawId")
    .get(themeController.getSubSectionsAndRegulationsByThemeIdAndLawId);
  app.route("/themes/:themeId/regulations/:regulationId").get(themeController.getLawsAndSubSectionsByThemeIdAndRegulationId);
  app.route("/themes/:themeId/implementation").get(themeController.getImplementationByThemeId);

};

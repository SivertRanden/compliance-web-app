module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  const regulationController = require("../controllers/regulationController");
  const categoryController = require("../controllers/categoryController");
  const answerController = require("../controllers/answerController");
  const subsectionController = require("../controllers/subsectionController");
  const themeController = require("../controllers/themeController");
  const implementationController = require("../controllers/implementationController");

  //laws
  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);

  //Regulations
  app.route("/regulations/:regulation_id").get(regulationController.getRegulation);

  //Categories
  app.route("/categories").get(categoryController.getCategories);

  //Answers
  app.route("/answers/:answerId").get(answerController.getAnswer);
  app.route("/answers").get(answerController.getAnswersByParameter);

  //Subsections
  app.route("/subsections/:subsectionId").get(subsectionController.getSubsection);

  //Themes
  app.route("/themes").get(themeController.getThemes);
  app.route("/themes/:themeId").get(themeController.getThemeById);

  //Implementations
  app.route("/implementations").get(implementationController.getImplementation);
};

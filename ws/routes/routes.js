module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);

  const regulationController = require("../controllers/regulationController");
  app.route("/regulations/:regulation_id").get(regulationController.getRegulation);

  const categoryController = require("../controllers/categoryController");
  app.route("/categories").get(categoryController.getCategories);

  const answerController = require("../controllers/answerController");
  app.route("/answers/:answerId").get(answerController.getAnswer);
  app.route("/answers").get(answerController.getAnswersByParameter);

  const subsectionController = require("../controllers/subsectionController");
  app.route("/subsections/:subsectionId").get(subsectionController.getSubsection);

  const themeController = require("../controllers/themeController");
  app.route("/themes").get(themeController.getThemes);
  app.route("/themes/:themeId").get(themeController.getThemeById);

  const implementationController = require("../controllers/implementationController");
  app.route("/implementations").get(implementationController.getImplementation);
};

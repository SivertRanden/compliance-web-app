module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);

  const categoryController = require("../controllers/categoryController");
  app.route("/categories").get(categoryController.getCategories);

  const answerController = require("../controllers/answerController");
  app.route("/answers/:answerId").get(answerController.getAnswer);
  app.route("/answers").get(answerController.getAnswersByParameter);
};

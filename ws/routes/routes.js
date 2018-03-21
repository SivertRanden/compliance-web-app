module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  app.route("/laws").get(lawController.getLaws);

  const categoryController = require("../controllers/categoryController");
  app.route("/categories").get(categoryController.getCategories);
};

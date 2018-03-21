module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  const regulationController = require("../controllers/regulationController");

  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);

  app.route("/regulations/:regulation_id").get(regulationController.getRegulation);
};

module.exports = function(app) {
  const lawController = require("../controllers/lawController");

  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);
};

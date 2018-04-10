module.exports = function(app) {
  const lawController = require("../controllers/lawController");
  const subsectionController = require("../controllers/subsectionController");

  app.route("/laws").get(lawController.getLaws);
  app.route("/laws/:lawId").get(lawController.getLaw);
  app
    .route("/subsections/:subsectionId")
    .get(subsectionController.getSubsection);
};

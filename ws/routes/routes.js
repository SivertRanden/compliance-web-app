module.exports = function(app) {
  const lawController = require("../controllers/lawController");

  app.route("/laws").get(lawController.getLaws);
};

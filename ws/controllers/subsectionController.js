const subsectionDAO = require("./../dao/subsectionDAO.js");

exports.getSubsection = function(req, res) {
  subsectionDAO.getSubsectionByID(req.params.subsectionId, (err, row) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!row) {
      res.send("This subsection does not exist!!!");
    } else {
      res.json(row);
    }
  });
};

const dao = require("./db.js");
const db = dao.connection;

exports.getAllCategories = function() {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all("SELECT * FROM category", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
  return promise;
};

const dao = require("./db.js");
const db = dao.connection;

exports.getImplementationByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT i.* FROM implementation as i, theme as t WHERE t.id_theme = ? AND t.id_theme = i.theme_id",
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });
  return promise;
};

exports.getKeyPersonsByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT p.initials FROM person AS p, key_person AS kp, implementation AS i WHERE i.theme_id = ? AND i.id_implementation = kp.implementation_id AND kp.person_id = p.id_person",
        [id],
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });

  return promise;
};

exports.getTrainingPersonsByThemeId = function(id) {
  var promise = new Promise(function(resolve, reject) {
    db.serialize(() => {
      db.all(
        "SELECT p.initials FROM person AS p, training_person AS tp, implementation AS i WHERE i.theme_id = ? AND i.id_implementation = tp.implementation_id AND tp.person_id = p.id_person",
        [id],
        (err, rows) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(rows);
          }
        }
      );
    });
  });

  return promise;
};

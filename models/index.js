const db = require("../db/index");

exports.getAllPlanes = async () => {
  return db.query("SELECT * FROM aircrafts");
};

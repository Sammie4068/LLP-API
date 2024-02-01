const db = require("../db/index");

exports.getAllPlanes = async () => {
  return db.query("SELECT * FROM aircrafts");
};

exports.getParts = async (aircraft) => {
  return db.query("SELECT * FROM parts WHERE aircraft = $1", [aircraft])
}
const db = require("../db/index");

exports.getAllPlanes = async () => {
  return db.query("SELECT * FROM aircrafts");
};

exports.getParts = async (aircraft) => {
  return db.query("SELECT * FROM parts WHERE aircraft = $1", [aircraft]);
};

exports.addParts = async (data) => {
  return db.query(
    "INSERT INTO parts (aircraft, description, number, quantity, ac, hrsleft, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      data.aircraft,
      data.description,
      data.number,
      data.quantity,
      data.ac,
      data.hrsleft,
      data.date,
    ]
  );
};

exports.updateParts = async (data) => {
  return db.query(
    "UPDATE parts SET description = $1, number = $2, quantity= $3, ac = $4, hrsleft= $5, date = $6 WHERE id=$7 RETURNING *",
    [
      data.description,
      data.number,
      data.quantity,
      data.ac,
      data.hrsleft,
      data.date,
      data.id,
    ]
  );
};

exports.getNumOfParts = async () => {
  return db.query(
    "SELECT a.name, COUNT(p.id) FROM aircrafts a JOIN parts p ON a.name = p.aircraft GROUP BY a.id;"
  );
};

exports.logUpdate = async (ac, aircraft) => {
  return db.query(
    "UPDATE parts SET ac = ac + $1, hrsleft = hrsleft - $1 WHERE aircraft=$2 RETURNING *",
    [ac, aircraft]
  );
};

exports.landingUpdate = async (landings, aircraft) => {
  return db.query(
    "UPDATE aircrafts SET landings = landings + $1 WHERE name=$2 RETURNING *",
    [landings, aircraft]
  );
};

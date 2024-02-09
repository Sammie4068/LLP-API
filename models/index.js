const db = require("../db/index");

exports.getAllPlanes = async () => {
  return db.query("SELECT * FROM aircrafts");
};

exports.getParts = async (aircraft) => {
  return db.query("SELECT * FROM parts WHERE aircraft = $1", [aircraft]);
};

exports.getLog = async (aircraft) => {
  return db.query("SELECT * FROM logs WHERE aircraft = $1", [aircraft]);
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

exports.addLog = async (data) => {
  return db.query(
    "INSERT INTO logs VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *",
    [
      data.aircraft,
      data.pilot,
      data.crew,
      data.nature,
      data.landings,
      data.starting,
      data.destination,
      data.takeoff,
      data.landingtime,
      data.incident,
      data.actiontaken,
      data.engineer,
      data.date,
      data.itemmel,
      data.opendate,
      data.category,
      data.limitdate,
      data.created,
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
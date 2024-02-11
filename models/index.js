const db = require("../db/index");

exports.getAllPlanes = async () => {
  return db.query("SELECT * FROM aircrafts");
};

exports.getParts = async (aircraft) => {
  return db.query("SELECT * FROM parts WHERE aircraft = $1", [aircraft]);
};
exports.getLogByID = async (id) => {
  return db.query("SELECT * FROM logs WHERE id = $1", [id]);
};

exports.getLog = async (aircraft) => {
  return db.query("SELECT * FROM logs WHERE aircraft = $1", [aircraft]);
};

exports.getDoc = async (aircraft) => {
  return db.query("SELECT * FROM docs WHERE aircraft = $1", [aircraft]);
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

exports.addDoc = async (data) => {
  return db.query(
    "INSERT INTO docs VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [
      data.aircraft,
      data.title,
      data.photo,
      data.issue,
      data.expiring,
      data.created,
      data.status,
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

exports.landingUpdate = async (landings,ac, aircraft) => {
  return db.query(
    "UPDATE aircrafts SET landings = landings + $1, tet = tet + $2 WHERE name=$3 RETURNING *",
    [landings, ac, aircraft]
  );
};

exports.addAircraft = async (data) => {
  return db.query(
    "INSERT INTO aircrafts (name, tat, tet, landings) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      data.name,
      data.tat,
      data.tet,
      data.landings
    ]
  );
};

exports.removePart = async (id) => {
  return db.query(
    "DELETE FROM parts WHERE id = $1",[id]
  )
}
exports.removeDoc = async (id) => {
  return db.query(
    "DELETE FROM docs WHERE id = $1",[id]
  )
}
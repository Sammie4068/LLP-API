const { res, req, next, urlencoded } = require("express");
const {
  getAllPlanes,
  getParts,
  addParts,
  updateParts,
  getLog,
  addLog,
  getNumOfParts,
  logUpdate,
  landingUpdate,
  addAircraft,
  removePart,
  getLogByID,
  getDoc,
  addDoc,
  removeDoc,
  removeAircraft,
  removeLogs,
  removeAircraftPart,
  removeAircraftLogs,
  removeAircraftDocs,
} = require("../models/index");

const uploadImage = require("../utilities/index");

exports.addDoc = async (req, res, next) => {
  try {
    const response = await uploadImage(req.file.path);
    const { url } = response;
    const { aircraft, title, issue, expiring } = req.body;

    let status;
    const expiringDate = new Date(expiring);
    const currentDate = new Date();
    const daysDifference = Math.floor(
      (expiringDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    status = daysDifference;
    if (daysDifference <= 90 && daysDifference >= 0) {
      status = "due";
    } else if (daysDifference < 0) {
      status = "expired";
    } else {
      status = "active";
    }

    const data = {
      aircraft,
      title,
      issue,
      expiring,
      photo: url,
      created: currentDate,
      status,
    };

    const result = await addDoc(data);
    res.json(result.rows);
  } catch (er) {
    return next(err);
  }
};

exports.getAllPlanes = async (req, res, next) => {
  try {
    const results = await getAllPlanes();
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getNumOfParts = async (req, res, next) => {
  try {
    const results = await getNumOfParts();
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getParts = async (req, res, next) => {
  try {
    const results = await getParts(req.params.aircraft);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};
exports.getLogByID = async (req, res, next) => {
  try {
    const results = await getLogByID(req.params.id);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getLog = async (req, res, next) => {
  try {
    const results = await getLog(req.params.aircraft);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.getDoc = async (req, res, next) => {
  try {
    const results = await getDoc(req.params.aircraft);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.addLog = async (req, res, next) => {
  try {
    const results = await addLog(req.body);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.addParts = async (req, res, next) => {
  try {
    const results = await addParts(req.body);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.addAircraft = async (req, res, next) => {
  try {
    const results = await addAircraft(req.body);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.updateParts = async (req, res, next) => {
  try {
    const { description, number, quantity, ac, hrsleft, date } = req.body;
    const data = {
      description,
      number,
      quantity,
      ac,
      hrsleft,
      date,
      id: req.params.id,
    };
    const results = await updateParts(data);
    res.json(results.rows);
  } catch (err) {
    return next(err);
  }
};

exports.logUpdate = async (req, res, next) => {
  try {
    const { aircraft, ac, landings } = req.body;
    const partsUpdate = await logUpdate(ac, aircraft);
    const landingUpdateRes = await landingUpdate(landings, ac, aircraft);
    res.json(landingUpdateRes.rows);
  } catch (err) {
    return next(err);
  }
};

exports.removePart = async (req, res, next) => {
  try {
    const results = await removePart(req.params.id);
    res.json("success");
  } catch (err) {
    return next(err);
  }
};

exports.removeDoc = async (req, res, next) => {
  try {
    const results = await removeDoc(req.params.id);
    res.json("success");
  } catch (err) {
    return next(err);
  }
};

exports.removeAircraft = async (req, res, next) => {
  try {

    const aircraft = req.body.aircraft
    const results = await removeAircraft(req.params.id);
    const partRes = await removeAircraftPart(aircraft)
    const logRes = await removeAircraftLogs(aircraft);
    const docRes = await removeAircraftDocs(aircraft);

    res.json("success");
  } catch (err) {
    return next(err);
  }
};

exports.removeLogs = async (req, res, next) => {
  try {
    const results = await removeLogs(req.params.id);
    res.json("success");
  } catch (err) {
    return next(err);
  }
};

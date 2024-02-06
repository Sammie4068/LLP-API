const { res, req, next, urlencoded } = require("express");
const {
  getAllPlanes,
  getParts,
  addParts,
  updateParts,
  getNumOfParts,
  logUpdate,
  landingUpdate,
} = require("../models/index");

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

exports.addParts = async (req, res, next) => {
  try {
    const { aircraft, description, number, quantity, ac, hrsleft, date} = req.body
    const data = {
      aircraft,
      description,
      number,
      quantity,
      ac,
      hrsleft,
      date,
    };
    const results = await addParts(data);
    res.json(results.rows)
  } catch (err) {
    return next(err)
  }
}

exports.updateParts = async (req, res, next) => {
  try {
    const { id, description, number, quantity, ac, hrsleft, date } =
      req.body;
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
    return next(err)
  }
}

exports.logUpdate = async (req, res, next) => {
  try {
    const {aircraft, ac, landings} = req.body
    const partsUpdate = await logUpdate(ac, aircraft);
    const landingUpdateRes = await landingUpdate(landings, aircraft);
    res.json("sucess")
  } catch (err) {
    return next(err)
  }
}
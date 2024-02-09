const { res, req, next, urlencoded } = require("express");
const {
  getAllPlanes,
  getParts,
  addParts,
  updateParts,
  getLog,
  addLog,
} = require("../models/index");

exports.getAllPlanes = async (req, res, next) => {
  try {
    const results = await getAllPlanes();
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

exports.getLog = async (req, res, next) => {
  try {
    const results = await getLog(req.params.aircraft);
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

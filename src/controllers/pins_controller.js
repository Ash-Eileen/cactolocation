const { model } = require('mongoose');
const {
  getAllPins,
  getPinById,
  addPin,
  deletePin,
  updatePin,
} = require('../utils/pins_utilities');

const getPins = function (req, res) {
  getAllPins(req).exec((err, pins) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.render("home", {pins, layout: false})
  });
};

const getPin = function (req, res) {
  getPinById(req).exec((err, pin) => {
    if (err) {
      res.status(404);
      return res.send(`This pin doesn't exist :o`);
    }
    res.send(pin);
  });
};

const createPin = function (req, res) {
  addPin(req).save((err, pin) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.status(201);
    res.send(pin);
  });
};

const removePin = function (req, res) {
  deletePin(req.params.id).exec((err) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.status(204);
  });
};

const changePin = function (req, res) {
  updatePin(req).exec((err, pin) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.status(200);
    res.send(pin);
  });
};

module.exports = {
  getPins,
  getPin,
  createPin,
  removePin,
  changePin,
};

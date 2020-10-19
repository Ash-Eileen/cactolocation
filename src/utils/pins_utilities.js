const Pin = require('../models/pin');

const getAllPins = function (req) {
  return Pin.find().populate('user');
};

const getPinById = function (req) {
  return Pin.findById(req.params.id);
};

const addPin = function (req) {
  let date = Date.now();
  req.body.create_date = date;
  req.body.modified_date = date;

  return new Pin(req.body);
};

const deletePin = function (req) {
  return Pin.findByIdAndRemove(req);
};

const updatePin = function (req) {
  req.body.modified_date = Date.now();
  return Pin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
};

module.exports = {
  getAllPins,
  getPinById,
  addPin,
  deletePin,
  updatePin,
};

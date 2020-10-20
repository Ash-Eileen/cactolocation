const Pin = require('../models/pin');

const getAllPins = function (req) {
  return Pin.find().populate('user');
};

const getPinById = function (req) {
  return Pin.findById(req.params.id);
};

const addPin = function (req) {
  let date = Date.now();

  let pin = {
    address: req.body.address,
    long: req.body.long,
    lat: req.body.lat,
    health: req.body.health,
    type: req.body.type,
    description: req.body.description,
    create_date: date,
    modified_date: date,
    user: req.user.id,
  };

  return new Pin(pin);
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

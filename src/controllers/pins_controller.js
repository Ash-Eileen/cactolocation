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
    res.render('home', { pins, layout: false });
  });
};

const getPin = function (req, res) {
  getPinById(req).exec((err, pin) => {
    if (err) {
      res.status(404);
      return res.redirect('404');
    }
    if (req.user.id == pin.user) {
      res.render("edit", {pin});
    } else {
      res.redirect('/');
    }
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
    res.redirect('/');
  });
};

const removePin = function (req, res) {
  getPinById(req).exec((err, pin) => {
    if (err) {
      res.status(404);
      return res.send(`This pin doesn't exist :o`);
    }
    if (req.user.id == pin.user) {
      deletePin(req).exec((err) => {
        if (err) {
          res.status(500);
          return res.json({
            error: err.message,
          });
        }
        res.redirect("/")
      });
    } else {  
      res.redirect("/")
    }
  })
};

const changePin = function (req, res) {
  updatePin(req).exec((err, pin) => {
    if (err) {
      res.status(500);
      return res.json({
        error: err.message,
      });
    }
    res.redirect('/');
  });
};

module.exports = {
  getPins,
  getPin,
  createPin,
  removePin,
  changePin,
};

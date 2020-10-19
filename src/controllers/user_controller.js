const Pin = require('../models/pin');

function dashboard(req, res) {
  // res.send("Welcome to your dashboard!");
  Pin.find({ user: req.user.id })
    .populate('user')
    .then((pins) => {
      res.render('dashboard', { pins });
    });
  // const username = req.user.username;
  // res.render('dashboard', { username });
}

module.exports = { dashboard };

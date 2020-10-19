const express = require('express');
const router = express.Router();
const {
  getPins,
  getPin,
  createPin,
  removePin,
  changePin,
} = require('../controllers/pins_controller');

const { 
  authorise 
} = require('../middleware/authorisation_middleware');

router.get('/', getPins);

router.get('/new', authorise, (req, res) => {
  let latLong = {
    lat: req.query.lat,
    long: req.query.long
  }
  res.render('new',{latLong});
});

router.get('/pin/:id', authorise, getPin);

router.post('/', authorise, createPin);

router.post('/pin/delete/:id', authorise, removePin);

router.post('/pin/:id', authorise, changePin);

module.exports = router;

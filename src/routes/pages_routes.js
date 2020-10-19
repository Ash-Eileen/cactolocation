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

router.get('/pin/:id', getPin);

router.post('/', createPin);

router.delete('/pin/:id', removePin);

router.put('/pin/:id', changePin);

module.exports = router;

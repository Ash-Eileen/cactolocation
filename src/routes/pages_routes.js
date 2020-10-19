const express = require('express');
const router = express.Router();
const {
  getPins,
  getPin,
  createPin,
  removePin,
  changePin,
} = require('../controllers/pins_controller');

router.get('/', getPins);

router.get('/:id', getPin);

router.post('/', createPin);

router.delete('/:id', removePin);

router.put('/:id', changePin);

module.exports = router;

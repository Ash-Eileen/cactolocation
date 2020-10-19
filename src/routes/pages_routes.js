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
router.get('/new', (req, res) => {
  // res.send('STORIES');
  res.render('new');
});
router.get('/pin/:id', getPin);

router.post('/', createPin);

router.delete('/pin/:id', removePin);

router.put('/pin/:id', changePin);

module.exports = router;

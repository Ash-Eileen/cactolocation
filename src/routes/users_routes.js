const express = require('express');
const router = express.Router();

const { authorise } = require('../middleware/authorisation_middleware');

const { dashboard } = require('../controllers/user_controller');

router.get('/', authorise, dashboard);

module.exports = router;

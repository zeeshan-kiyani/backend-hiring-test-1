const express = require('express');
const controllers = require('../controllers');
const router = express.Router();
// User routesee
const cors = require('cors');

router.options('*', cors());
// route for make call
router.post('/', controllers.callController.makeCall);

module.exports = router;

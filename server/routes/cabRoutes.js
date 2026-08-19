const express = require('express');
const router = express.Router();
const { getCabs } = require('../controllers/cabController');

router.get('/', getCabs);

module.exports = router;

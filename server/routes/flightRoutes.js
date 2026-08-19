const express = require('express');
const router = express.Router();
const { getFlights, createFlight, deleteFlight } = require('../controllers/flightController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', getFlights);
router.post('/', authMiddleware, adminMiddleware, createFlight);
router.delete('/:id', authMiddleware, adminMiddleware, deleteFlight);

module.exports = router;

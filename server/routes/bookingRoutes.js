const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getAllBookings, cancelBooking } = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getMyBookings);
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.put('/:id/cancel', authMiddleware, cancelBooking);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getHotels, createHotel, deleteHotel } = require('../controllers/hotelController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', getHotels);
router.post('/', authMiddleware, adminMiddleware, createHotel);
router.delete('/:id', authMiddleware, adminMiddleware, deleteHotel);

module.exports = router;

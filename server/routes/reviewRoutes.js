const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', authMiddleware, createReview);

module.exports = router;

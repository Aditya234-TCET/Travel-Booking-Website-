const mongoose = require('mongoose');
const Review = require('../models/Review');
const store = require('../store');

const getReviews = async (req, res) => {
  const { targetType, targetId } = req.query;

  if (mongoose.connection.readyState === 1) {
    let filter = {};
    if (targetType && targetId) {
      filter.targetType = targetType;
      filter.targetId = targetId;
    }
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(reviews.map(r => ({ ...r.toObject(), id: r._id.toString() })));
  } else {
    let reviews = [...store.reviews];
    if (targetType && targetId) {
      reviews = reviews.filter(r => r.targetType === targetType && r.targetId === targetId);
    }
    return res.status(200).json(reviews.reverse());
  }
};

const createReview = async (req, res) => {
  const { targetType, targetId, rating, comment } = req.body;
  if (!targetType || !targetId || !rating || !comment) {
    return res.status(400).json({ message: 'Rating, comment, and target entity are required' });
  }

  if (mongoose.connection.readyState === 1) {
    const review = await Review.create({
      userId: req.user.id,
      userName: req.user.name,
      targetType, targetId,
      rating: Number(rating),
      comment
    });
    return res.status(201).json({ message: 'Review posted successfully', review: { ...review.toObject(), id: review._id.toString() } });
  } else {
    const newReview = {
      id: 'rev-' + Date.now(),
      userId: req.user.id, userName: req.user.name,
      targetType, targetId, rating: Number(rating), comment,
      createdAt: new Date().toISOString()
    };
    store.reviews.push(newReview);
    return res.status(201).json({ message: 'Review posted successfully', review: newReview });
  }
};

module.exports = { getReviews, createReview };

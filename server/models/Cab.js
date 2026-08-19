const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. Premium Sedan
  model: { type: String, required: true }, // e.g. City, Ciaz
  capacity: { type: String, required: true }, // e.g. 4 Seats
  price: { type: Number, required: true }, // Base price per km or flat fee
  duration: { type: String, required: true }, // e.g. 40 mins
  rating: { type: Number, default: 4.8 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cab', cabSchema);

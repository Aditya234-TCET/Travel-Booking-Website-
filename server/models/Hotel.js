const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  pricePerNight: { type: Number, required: true },
  image: { type: String, required: true },
  amenities: [{ type: String }],
  description: { type: String },
  latitude: { type: Number, default: 15.2993 },
  longitude: { type: Number, default: 74.1240 },
  reviewsCount: { type: Number, default: 120 }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);

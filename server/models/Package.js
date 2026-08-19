const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  image: { type: String, required: true },
  includedItems: [{ type: String }],
  highlights: [{ type: String }],
  latitude: { type: Number, default: 15.2993 },
  longitude: { type: Number, default: 74.1240 }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);

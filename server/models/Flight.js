const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true, default: 60 },
  duration: { type: String, default: '2h 30m' },
  rating: { type: Number, default: 4.6 },
  logo: { type: String, default: '✈️' }
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);

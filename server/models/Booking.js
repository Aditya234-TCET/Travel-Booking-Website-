const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  itemType: { type: String, enum: ['flight', 'hotel', 'package'], required: true },
  itemId: { type: String, required: true },
  itemTitle: { type: String, required: true },
  destination: { type: String, required: true },
  itemDetails: { type: Object, default: {} },
  travelDate: { type: String, required: true },
  returnDate: { type: String },
  travelers: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  transactionId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

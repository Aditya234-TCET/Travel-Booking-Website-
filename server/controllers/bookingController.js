const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const User = require('../models/User');
const store = require('../store');

const createBooking = async (req, res) => {
  try {
    const { itemType, itemId, itemTitle, destination, itemDetails, travelDate, returnDate, travelers, totalPrice, paymentMethod } = req.body;

    if (!itemType || !itemId || !travelDate || !totalPrice || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required booking parameters' });
    }

    const transactionId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
    let newBookingObj;

    if (mongoose.connection.readyState === 1) {
      // Double booking check
      const existing = await Booking.findOne({
        userId: req.user.id,
        itemId,
        travelDate,
        bookingStatus: 'confirmed'
      });

      if (existing) {
        return res.status(400).json({ message: 'You already have an active booking for this item on the selected date.' });
      }

      const booking = await Booking.create({
        userId: req.user.id,
        userName: req.user.name,
        itemType,
        itemId,
        itemTitle: itemTitle || 'Travel Item',
        destination: destination || 'Global',
        itemDetails: itemDetails || {},
        travelDate,
        returnDate: returnDate || '',
        travelers: Number(travelers) || 1,
        totalPrice: Number(totalPrice),
        paymentMethod,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        transactionId
      });

      // Reward points
      const earnedPoints = Math.round(Number(totalPrice) * 0.05);
      await User.findByIdAndUpdate(req.user.id, { $inc: { loyaltyPoints: earnedPoints } });

      newBookingObj = { ...booking.toObject(), id: booking._id.toString() };
    } else {
      const existingBooking = store.bookings.find(b => 
        b.userId === req.user.id &&
        b.itemId === itemId &&
        b.travelDate === travelDate &&
        b.bookingStatus === 'confirmed'
      );

      if (existingBooking) {
        return res.status(400).json({ message: 'You already have an active booking for this item on the selected date.' });
      }

      const newBooking = {
        id: 'bk-' + Date.now(),
        userId: req.user.id,
        userName: req.user.name,
        itemType, itemId, itemTitle: itemTitle || 'Travel Item',
        destination: destination || 'Global', itemDetails: itemDetails || {},
        travelDate, returnDate: returnDate || '', travelers: Number(travelers) || 1,
        totalPrice: Number(totalPrice), paymentMethod, paymentStatus: 'paid',
        bookingStatus: 'confirmed', transactionId, createdAt: new Date().toISOString()
      };

      store.bookings.push(newBooking);
      const user = store.users.find(u => u.id === req.user.id);
      if (user) {
        user.loyaltyPoints = (user.loyaltyPoints || 0) + Math.round(Number(totalPrice) * 0.05);
      }
      newBookingObj = newBooking;
    }

    return res.status(201).json({
      message: 'Booking confirmed successfully!',
      booking: newBookingObj,
      pointsEarned: Math.round(Number(totalPrice) * 0.05)
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(bookings.map(b => ({ ...b.toObject(), id: b._id.toString() })));
  } else {
    const userBookings = store.bookings.filter(b => b.userId === req.user.id);
    return res.status(200).json(userBookings.reverse());
  }
};

const getAllBookings = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.status(200).json(bookings.map(b => ({ ...b.toObject(), id: b._id.toString() })));
  } else {
    return res.status(200).json(store.bookings.slice().reverse());
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;

  if (mongoose.connection.readyState === 1) {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();
    return res.status(200).json({ message: 'Booking cancelled successfully. Refund initiated.', booking: { ...booking.toObject(), id: booking._id.toString() } });
  } else {
    const booking = store.bookings.find(b => b.id === id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    return res.status(200).json({ message: 'Booking cancelled successfully. Refund initiated.', booking });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, cancelBooking };

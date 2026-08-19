const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Package = require('../models/Package');
const Hotel = require('../models/Hotel');
const Flight = require('../models/Flight');
const store = require('../store');

const getAdminStats = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const bookings = await Booking.find();
    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => b.bookingStatus === 'confirmed').length;
    const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + Number(b.totalPrice), 0);

    const totalUsers = await User.countDocuments();
    const totalPackages = await Package.countDocuments();
    const totalHotels = await Hotel.countDocuments();
    const totalFlights = await Flight.countDocuments();

    const popularDestinations = [
      { name: 'Goa', bookings: 45, revenue: 832500 },
      { name: 'Paris', bookings: 28, revenue: 2660000 },
      { name: 'Tokyo', bookings: 22, revenue: 2750000 },
      { name: 'Dubai', bookings: 31, revenue: 2108000 },
      { name: 'Bali', bookings: 39, revenue: 1755000 }
    ];

    const recentBookings = bookings.slice(-5).reverse().map(b => ({ ...b.toObject(), id: b._id.toString() }));

    return res.status(200).json({
      totalBookings, activeBookings, totalRevenue,
      totalUsers, totalPackages, totalHotels, totalFlights,
      popularDestinations, recentBookings
    });
  } else {
    const totalBookings = store.bookings.length;
    const activeBookings = store.bookings.filter(b => b.bookingStatus === 'confirmed').length;
    const totalRevenue = store.bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + Number(b.totalPrice), 0);
    const totalUsers = store.users.length;
    const totalPackages = store.packages.length;
    const totalHotels = store.hotels.length;
    const totalFlights = store.flights.length;

    const popularDestinations = [
      { name: 'Goa', bookings: 45, revenue: 832500 },
      { name: 'Paris', bookings: 28, revenue: 2660000 },
      { name: 'Tokyo', bookings: 22, revenue: 2750000 },
      { name: 'Dubai', bookings: 31, revenue: 2108000 },
      { name: 'Bali', bookings: 39, revenue: 1755000 }
    ];

    return res.status(200).json({
      totalBookings, activeBookings, totalRevenue,
      totalUsers, totalPackages, totalHotels, totalFlights,
      popularDestinations, recentBookings: store.bookings.slice(-5).reverse()
    });
  }
};

module.exports = { getAdminStats };

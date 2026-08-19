const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const aiPlannerRoutes = require('./routes/aiPlannerRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ai-planner', aiPlannerRoutes);
app.use('/api/admin', adminRoutes);

// Root route check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Wanderlust Travel Booking API',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// Database Connection with Fallback
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travel_booking';

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000
})
.then(() => {
  console.log('✅ Connected to MongoDB Compass / Local Database');
})
.catch((err) => {
  console.log('⚠️ MongoDB not detected locally (or offline). Application is running with In-Memory Mock Store fallback seamlessly!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Travel Booking Server running on http://localhost:${PORT}`);
});

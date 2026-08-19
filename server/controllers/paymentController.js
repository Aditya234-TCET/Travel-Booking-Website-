const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const store = require('../store');

// Simulated Payment Gateway Controller (Stripe & Razorpay)
const processPayment = async (req, res) => {
  const { amount, currency, method, cardDetails, upiId } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ message: 'Amount and payment method are required' });
  }

  // Simulate payment processing delay & validation
  const isSuccessful = true; // High fidelity demo success

  if (isSuccessful) {
    const transactionId = 'TXN_GATEWAY_' + Math.random().toString(36).substring(2, 11).toUpperCase();
    
    // Save to DB or Store
    if (mongoose.connection.readyState === 1) {
       await Payment.create({
         userId: req.user ? req.user.id : new mongoose.Types.ObjectId(), // fallback for demo
         transactionId,
         amount: Number(amount),
         currency: currency || 'INR',
         method,
         status: 'successful'
       });
    } else {
       if(!store.payments) store.payments = [];
       store.payments.push({
         id: 'pay-' + Date.now(),
         transactionId, amount, currency, method, status: 'successful'
       });
    }

    return res.status(200).json({
      success: true,
      transactionId,
      message: `Payment of ${currency || '₹'}${amount} processed successfully via ${method}`,
      timestamp: new Date().toISOString()
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Payment verification failed. Please check payment details.'
    });
  }
};

module.exports = { processPayment };

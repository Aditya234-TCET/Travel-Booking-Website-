// Simulated Payment Gateway Controller (Stripe & Razorpay)
const processPayment = (req, res) => {
  const { amount, currency, method, cardDetails, upiId } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ message: 'Amount and payment method are required' });
  }

  // Simulate payment processing delay & validation
  const isSuccessful = true; // High fidelity demo success

  if (isSuccessful) {
    const transactionId = 'TXN_GATEWAY_' + Math.random().toString(36).substring(2, 11).toUpperCase();
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

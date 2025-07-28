const express = require('express');
const router = express.Router();

const {
  createOrder,
  savePayment
} = require('../controllers/paymentController');

// Create Razorpay order
router.post('/create-order', createOrder);

// Save successful payment to DB
router.post('/save-payment', savePayment);

module.exports = router;

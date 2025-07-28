const Razorpay = require('razorpay');
const Donation = require('../models/Donation');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { name, email, amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ order, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Order creation failed");
  }
};

const savePayment = async (req, res) => {
  const { name, email, amount, razorpay_order_id, razorpay_payment_id } = req.body;

  try {
    const donation = new Donation({
      name,
      email,
      amount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await donation.save();
    res.status(200).json({ message: "Payment saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save payment" });
  }
};

module.exports = {createOrder, savePayment}
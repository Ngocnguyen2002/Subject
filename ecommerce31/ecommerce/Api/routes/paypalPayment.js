const { createOrder, capturePayment } = require('../controllers/paypalPaymentController');

const router = require('express').Router();
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID

router.get("/my-server/config", (req, res) => {
  return res.status(200).json({
    status: "OK",
    data: PAYPAL_CLIENT_ID || "No data"
  })
});
router.post("/my-server/create-paypal-order", createOrder);
router.post("/my-server/capture-paypal-order", (req, res) => {
  return res.status(200).json(capturePayment)
});

module.exports = router;

const { createOrder } = require('../controllers/zaloPayPaymentController');

const router = require('express').Router();

router.post("/create_order", createOrder )

module.exports = router;

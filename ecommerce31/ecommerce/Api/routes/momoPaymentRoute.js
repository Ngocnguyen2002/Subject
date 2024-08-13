const { CreateOrder } = require('../controllers/momoPaymentController');

const router = require('express').Router();

router.post("/create_order", CreateOrder )

module.exports = router;
const { hashSecretKey } = require('../controllers/vnPayPaymentController');

const router = require('express').Router();

router.post("/create_order", hashSecretKey )

module.exports = router;

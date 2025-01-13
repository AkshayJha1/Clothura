const express = require('express');
const router = express();
const checkoutController = require('../Controllers/checkout-controller');

router.route('/createPaymentIntent').post(checkoutController.createPaymentIntent);
module.exports = router;
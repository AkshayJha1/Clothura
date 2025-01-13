const express = require('express');
const router = express();
const myOrderController = require('../Controllers/myOrder-controller');

router.route('/add').post(myOrderController.myOrders); 
router.route('/fetch').post(myOrderController.gettingMyOrders);

module.exports = router;
const express = require('express');
const router = express();
const sellerController = require('../Controllers/seller-controller');

router.route('/addproduct').post(sellerController.addProduct);
router.route('/updateproduct').post(sellerController.updateProduct);
router.route('/removeproduct').post(sellerController.removeProduct); 
router.route('/sellerproducts').post(sellerController.sellerProducts); 
module.exports = router;
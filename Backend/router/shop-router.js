const express = require('express');
const router = express();
const shopController = require('../Controllers/shop-controller');

router.route('/men').get(shopController.men);
router.route('/women').get(shopController.women);
router.route('/kids').get(shopController.kids);
router.route('/allProducts').get(shopController.allProducts);

module.exports = router;
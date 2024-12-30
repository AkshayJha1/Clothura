const express = require('express');
const router = express();
const categoryController = require('../Controllers/category-controller')

router.route('/:category').get(categoryController);

module.exports = router;
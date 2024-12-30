const express = require('express');
const router = express();
const { home } = require('../Controllers/home-controller');

router.route('').get(home);

module.exports = router;
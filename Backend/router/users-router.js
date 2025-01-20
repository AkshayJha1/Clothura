const express = require('express');
const router = express();
const userController = require('../Controllers/users-controller');
const {registerSchema , loginSchema } = require('../Validator/user-validator');
const validate = require('../Middleware/validate-middleware');

router.route('/registerOTPMailing').post(userController.registerOTPMailing); 
router.route('/registerViaOtp').post(validate(registerSchema) , userController.registerViaOtp); 
router.route('/login').post( validate(loginSchema) , userController.login);
router.route('/loginOTPMailing').post(userController.loginOTPMailing);
router.route('/loginViaOtp').post(userController.loginViaOtp);
module.exports = router; 
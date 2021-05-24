const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth_controller');
const passport = require('../config/passport');


router.post('/login', AuthController.authenticateLogin);
router.post('/register', AuthController.registerUser);

module.exports = router;
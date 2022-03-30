const express  = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/authentication');
const AuthController = require('../controllers/auth.controller');

router.post('/send', AuthMiddleware.validateUserToken, AuthController.sendConfirmationEmail);
router.delete('/confirm', AuthMiddleware.validateUserToken, AuthController.validateConfirmationCode);

module.exports = router;
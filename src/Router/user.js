const express  = require('express');

const router = express.Router();

const RegisterMiddlewage = require('../middlewares/register');
const AuthMiddleware = require('../middlewares/authentication');
const UserController = require('../controllers/user.controller');
const ConfigController = require('../controllers/config.controller');

router.post('/register', RegisterMiddlewage.validateUserBody, UserController.register);
router.post('/login', UserController.login);
router.delete('/logout', AuthMiddleware.validateUserToken, UserController.logout);
router.put('/password', AuthMiddleware.validateUserToken, ConfigController.updatePassword);
router.put('/register', AuthMiddleware.validateUserToken, ConfigController.updateRegister);


module.exports = router;
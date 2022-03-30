const express  = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/authentication');
const SearchController = require('../controllers/search.controller');

router.get('/', AuthMiddleware.validateUserToken, SearchController.getRentableCars);

module.exports = router;
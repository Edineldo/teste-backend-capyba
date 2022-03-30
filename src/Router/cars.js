const express  = require('express');

const router = express.Router();

const AuthMiddleware = require('../middlewares/authentication');
const CarsController = require('../controllers/cars.controller');

router.get('/search', AuthMiddleware.validateUserToken, CarsController.getRentableModels);
router.post('/schedule', AuthMiddleware.validateUserToken, CarsController.scheduleRent);
router.get('/schedule', AuthMiddleware.validateUserToken, CarsController.getMySchedules);
router.delete('/schedule', AuthMiddleware.validateUserToken, CarsController.cancelSchedule);

module.exports = router;
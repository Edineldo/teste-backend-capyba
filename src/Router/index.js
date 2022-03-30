const express = require('express');
const path = require('path');

const router = express.Router();

const user = require('./user');
const cars = require('./cars');
const auth = require('./auth');

router.use('/user', user);
router.use('/cars', cars);
router.use('/auth', auth);

module.exports = router;

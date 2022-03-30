const express = require('express');
const path = require('path');

const router = express.Router();

const user = require('./user');
const search = require('./search');
const auth = require('./auth');

router.use('/user', user);
router.use('/search', search);
router.use('/auth', auth);

module.exports = router;

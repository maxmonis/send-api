const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { check } = require('express-validator');

router.post('/', auth.userAuthentication);
router.get('/', auth.authenticatedUser);

module.exports = router;

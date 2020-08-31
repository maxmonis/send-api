const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
  ],
  user.newUser
);

module.exports = router;

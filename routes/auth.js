const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  userAuthentication,
  authenticatedUser,
} = require('../controllers/authController');

router.post('/', userAuthentication);
router.get('/', auth, authenticatedUser);

module.exports = router;

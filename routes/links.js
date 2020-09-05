const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { newLink } = require('../controllers/linkController');

router.post('/', auth, newLink);

module.exports = router;

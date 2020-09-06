const express = require('express');
const router = express.Router();
const { addFile } = require('../controllers/fileController');
const auth = require('../middleware/auth');

router.post('/', auth, addFile);

module.exports = router;

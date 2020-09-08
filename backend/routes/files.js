const express = require('express');
const router = express.Router();
const { addFile, download } = require('../controllers/fileController');
const auth = require('../middleware/auth');

router.post('/', auth, addFile);

router.get('/:file', download);

module.exports = router;

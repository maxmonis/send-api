const express = require('express');
const router = express.Router();
const { addFile, removeFile } = require('../controllers/fileController');
const auth = require('../middleware/auth');

router.post('/', auth, addFile);

router.delete('/:id', removeFile);

module.exports = router;

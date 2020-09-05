const express = require('express');
const router = express.Router();
const { addFile, removeFile } = require('../controllers/fileController');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

router.post('/', upload.single('file'), addFile);

router.delete('/:id', removeFile);

module.exports = router;

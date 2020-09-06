const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { newLink, getLink } = require('../controllers/linkController');
const { removeFile } = require('../controllers/fileController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('original_name', 'Name is required').not().isEmpty(),
  ],
  auth,
  newLink
);

router.get('/:url', getLink, removeFile);

module.exports = router;

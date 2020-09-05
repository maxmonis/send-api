const Link = require('../models/Link');

exports.newLink = async (req, res, next) => {
  res.json({ msg: req.body });
};

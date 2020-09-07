const Link = require('../models/Link');
const { generate } = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newLink = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { original_name, password, downloads, name } = req.body;
  const link = new Link();
  link.url = generate();
  link.name = name;
  link.original_name = original_name;
  link.password = password;
  if (req.user) {
    if (downloads) {
      link.downloads = downloads;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }
    link.author = req.user.id;
  }
  try {
    await link.save();
    res.json({ msg: `${link.url}` });
  } catch (error) {
    console.log(error);
  }
};

exports.allLinks = async (req, res) => {
  try {
    const links = await Link.find({}).select('url -_id');
    res.json(links);
  } catch (error) {
    console.log(error);
  }
};

exports.getLink = async (req, res, next) => {
  const { url } = req.params;
  const link = await Link.findOne({ url });
  if (!link) {
    res.status(400).json({ msg: 'Link not found' });
    return next();
  }
  const { name, downloads } = link;
  res.json({ file: name });
  if (downloads === 1) {
    req.file = name;
    await Link.findOneAndRemove(req.params.url);
    next();
  } else {
    link.downloads--;
    await link.save();
  }
};

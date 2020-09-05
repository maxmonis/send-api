const Link = require('../models/Link');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

exports.newLink = async (req, res) => {
  const { original_name, password, downloads } = req.body;
  const link = new Link();
  link.url = shortid.generate();
  link.name = shortid.generate();
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

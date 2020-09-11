const User = require('../models/User');
const { genSalt, hash } = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'Email must be unique' });
  }
  user = new User(req.body);
  const salt = await genSalt(10);
  user.password = await hash(password, salt);
  try {
    user.save();
    res.json({ msg: `${name} added to users` });
  } catch (error) {
    console.log(error);
  }
};

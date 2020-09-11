const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config({ path: 'variables.env' });

exports.userAuthentication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ msg: 'User does not exist' });
    return next();
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: '8h',
      }
    );
    res.json(token);
  } else {
    res.status(401).json({ msg: 'Password is not correct' });
    return next();
  }
};

exports.authenticatedUser = (req, res) => {
  res.json({ user: req.user });
};

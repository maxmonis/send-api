const User = require('../models/User');

exports.newUser = async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ msg: 'Duplicate user, email must be unique' });
  }
  user = new User(req.body);
  user.save();
  res.json({ msg: 'User added' });
};

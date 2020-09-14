const jwt = require('jsonwebtoken');
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

module.exports = (req, res, next) => {
  const header = req.get('Authorization');
  if (header) {
    const token = header.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (error) {
      console.log(error);
      console.log('Invalid token');
    }
  }
  return next();
};

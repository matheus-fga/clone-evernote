require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const WithAuth = (req, res, next) => {
  const token = req.headers['x-acess-token'];
  if(!token)
    res.status(401).json({ error: 'Unauthorized: No token provided' });
  else {
    jwt.verify(token, secret, (error, decoded) => {
      if(error)
        res.status(401).json({ error: 'Unauthorized: Token invalid' });
      else {
        req.email = decoded.email;
        User.findOne({ email: decoded.email }).then(user => {
          req.user = user;
          next();
        }).catch(error => res.status(401).json({ error: error }));
      }
    });
  }
};

module.exports = WithAuth;
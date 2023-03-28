const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { User, Product } = require('../models');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = async ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    const user = await User.findById(data._id);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
  } catch (err) {
    console.log(err);
    throw new AuthenticationError('Invalid token');
  }

  return req;
};

const signToken = ({ firstName, email, _id }) => {
  const payload = { firstName, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };

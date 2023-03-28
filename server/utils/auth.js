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

const reviewMiddleware = async (resolve, parent, args, context, info) => {
  const { productId } = args;
  const { user } = context;
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const review = product.reviews.find(
    (review) => review.user.toString() === user._id.toString()
  );

  if (review) {
    throw new Error('You have already reviewed this product');
  }

  context.product = product;

  return resolve(parent, args, context, info);
};

const signToken = ({ firstName, email, _id }) => {
  const payload = { firstName, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, reviewMiddleware, signToken };

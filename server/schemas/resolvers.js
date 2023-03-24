const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },

    user: async (parent, { _id }) => {
      const user = await User.findById(_id);
      return user;
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect email or password");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect email or password");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;

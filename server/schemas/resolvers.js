const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Product, Review, Order } = require("../models");
const { signToken, reviewMiddleware } = require("../utils/auth");

const resolvers = {
  Query: {
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      const products = await Product.find(params).populate("category").select('-__v -updatedAt');

      // Populate reviews for each product
      for (let i = 0; i < products.length; i++) {
        products[i].reviews = await Review.find({ product: products[i]._id }).populate('user', '_id email firstName lastName');
      }

      return products;
    },
    product: async (parent, { _id }) => {
      const product = await Product.findById(_id).populate("category").populate('reviews.user', '_id email firstName lastName');
      product.reviews = await Review.find({ product: product._id }).populate('user', '_id email firstName lastName');
      return product;
    },
    categories: async () => {
      return await Category.find();
    },
    reviews: async () => {
      return await Review.find().populate('user', '_id email firstName lastName').populate({ path: 'product', populate: { path: 'reviews', populate: { path: 'createdAt' } } });
    },
    
    users: async () => {
      const users = await User.find();
      return users;
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const newUser = await User.create(args);
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
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
    createReview: async (parent, args, context) => {
      console.log('args:');
      console.log(args);
      const product = await Product.findById(args._id);
      const newReview = await Review.create({rating: args.rating, comment: args.review.comment, user: context.user, product});
      console.log('---product-----')
      console.log(product);
      console.log('---newReview--- ');
      console.log(newReview);
      try {
        // Check for authentication and validation of review
        // console.log('context');
        // console.log(context);
        // await reviewMiddleware(null, { productId: productid }, { req: context }, null);

        // Add review to product and save to database
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: args._id },  
          { $push: { reviews: newReview } },
          { new: true }
        ).populate("reviews").populate({
          path: "reviews",
          populate: "user"
        }).populate("category");

        return updatedProduct;
      } catch (err) {
        console.log(err); 
        throw new AuthenticationError('Invalid token');
      }
    },
  },
};

module.exports = resolvers;

const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Product, Review, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51MrZYVJnjl6y4QyETfkbBV2ivhB2TnwWoCGCvuExq1EBfvvXaR8SaRT8ohJHmZo7jok6at08mzKbVIK3XIv3mRud00Ei9b3ndR"
);
//require Models signToken from utils. stripe. and authentication error.

//console.log(process.env.STRIPE_SECRET_KEY);
//here we define our resolvers 
//mutations are declared at the bottom which are just functions to handle changes to the database
//while querys just get data from the datebase
const resolvers = {
  Query: {
    //query to get products and get reviews for that product
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

      const products = await Product.find(params)
        .populate("category")
        .select("-__v -updatedAt");

      // Populate reviews for each product
      for (let i = 0; i < products.length; i++) {
        products[i].reviews = await Review.find({
          product: products[i]._id,
        }).populate("user", "_id email firstName lastName");
      }

      return products;
    },
    //query to get single product by id
    product: async (parent, { _id }) => {
      const product = await Product.findById(_id)
        .populate("category")
        .populate("reviews.user", "_id email firstName lastName");
      product.reviews = await Review.find({ product: product._id }).populate(
        "user",
        "_id email firstName lastName"
      );
      return product;
    },
    //find all catagories
    categories: async () => {
      return await Category.find();
    },
    //find all reviews
    reviews: async () => {
      return await Review.find()
        .populate("user", "_id email firstName lastName")
        .populate({
          path: "product",
          populate: { path: "reviews", populate: { path: "createdAt" } },
        });
    },
    //find users
    users: async () => {
      const users = await User.find();
      return users;
    },
    //find info of logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    //finds a specific order
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        const order = user.orders.id(_id);
        return order;
      }
      throw new AuthenticationError("Not logged in");
    },
    //find reviews by the logged-in user
    userReviews: async (_, { userId }) => {
      // Fetch reviews by the provided userId
      // Implement your logic here
      // Return the reviews
    },
    //handles checkout and gets all products in cart, etc.
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({
        products: args.products,
      });

      const { products } = await order.populate("products");
      const line_items = [];

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
        })
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      console.log("console loggins is fun", line_items);
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
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, args, context) => {
      if (context.user) {
        const products = await Product.find({ _id: { $in: args.products } });
        console.log("here are the products", products);
        const total = products.reduce(
          (acc, { product, quantity }) => acc + product.price * quantity,
          0
        );
        const order = new Order({
          user: context.user._id,
          products: products,
          total,
          status: "confirmed",
        });
        console.log("here is the new order", order);
        await order.save();
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
    addProduct: async (parent, args, context) => {
      const category = await Category.findById(args.product.category);
      
      if (!category) {
        throw new Error("Category not found");
      }
    
      const newProduct = await Product.create({
        ...args.product,
        category: category._id
      });
    
      console.log(newProduct, "new product");
      return newProduct;
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
      console.log('args are', args);
      if (context.user) {
        const review = await Review.create({ ...args, user: context.user._id });
        await Product.findByIdAndUpdate(args.product, { $push: { reviews: review._id } });
        const populatedReview = await review.populate("user", "_id email firstName lastName");
        return populatedReview;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;

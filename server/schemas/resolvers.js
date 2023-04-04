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
    //find info of loged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    //finds all orders
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
    //handles checkout gets all products in cart etc.
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
  //mutations to add user. addOrder.
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
    //update products quantity if its been sold
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    //to add product to database
    addProduct: async (parent, args, context) => {
      // if(context.user.role !== "admin"){
      //   throw new AuthenticationError("Not admin");
      // }
      const newProduct = await Product.create(
        args.product

      );
      console.log(newProduct, "here product")
      return newProduct

    },
    //login logic if password and email are found in database
    //login user with token
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
    //create a review logic
    createReview: async (parent, args, context) => {
      console.log('args are', args);
      // Check if user has already reviewed the product
      const existingReview = await Review.findOne({
        user: context.user._id,
        product: args._id,
      });

      if (existingReview) {
        throw new Error("You've already reviewed this product!");
      }

      // Create new review
      const product = await Product.findById(args._id);
      const newReview = await Review.create({
        rating: args.rating,
        comment: args.review.comment,
        // createdAt: args.review.createdAt,
        user: context.user,
        product,
      });

      try {
        // Add review to product and save to database
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: args._id },
          { $push: { reviews: newReview } },
          { new: true }
        )
          .populate("reviews")
          .populate({ path: "reviews", populate: "user" })
          .populate("category");

        return updatedProduct;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Invalid token");
      }
    },
  },
};

module.exports = resolvers;

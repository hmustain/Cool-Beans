const db = require("./connection");
const { User, Category, Product, Review } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const users = await User.insertMany([
    {
      firstName: "Caleb",
      lastName: "Carnett",
      email: "caleb@example.com",
      password: "Password12345!",
      role: "admin",
    },

    {
      firstName: "Kaikane",
      lastName: "Lacno",
      email: "kai@example.com",
      password: "Password12345!",
      role: "admin",
    },

    {
      firstName: "Hunter",
      lastName: "Mustain",
      email: "hunter@example.com",
      password: "Password12345!",
      role: "admin",
    },
  ]);

  console.log('Users Seeded');

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Light Roast" },
    { name: "Medium Roast" },
    { name: "Dark Roast" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Light Roast 1",
      description: "This is a sample product",
      image: "/client/images/light-roast-coffee.jpg",
      category: categories[0]._id,
      price: 14.99,
      quantity: 500,
    },
    {
      name: "Light Roast 2",
      description: "This is a sample product",
      image: "/client/images/light-roast-coffee.jpg",
      category: categories[0]._id,
      price: 14.99,
      quantity: 500,
    },
    {
      name: "Light Roast 3",
      description: "This is a sample product",
      image: "/client/images/light-roast-coffee.jpg",
      category: categories[0]._id,
      price: 14.99,
      quantity: 500,
    },
    {
      name: "Medium Roast 1",
      description: "This is a sample product",
      image: "/client/images/medium-roast-coffee.jpg",
      category: categories[1]._id,
      price: 15.99,
      quantity: 500,
    },
    {
      name: "Medium Roast 2",
      description: "This is a sample product",
      image: "/client/images/medium-roast-coffee.jpg",
      category: categories[1]._id,
      price: 15.99,
      quantity: 500,
    },
    {
      name: "Medium Roast 3",
      description: "This is a sample product",
      image: "/client/images/medium-roast-coffee.jpg",
      category: categories[1]._id,
      price: 15.99,
      quantity: 500,
    },
    {
      name: "Dark Roast 1",
      description: "This is a sample product",
      image: "/client/images/dark-roast-coffee.jpg",
      category: categories[2]._id,
      price: 16.99,
      quantity: 500,
    },
    {
      name: "Dark Roast 2",
      description: "This is a sample product",
      image: "/client/images/dark-roast-coffee.jpg",
      category: categories[2]._id,
      price: 16.99,
      quantity: 500,
    },

    {
      name: "Dark Roast 3",
      description: "This is a sample product",
      image: "/client/images/dark-roast-coffee.jpg",
      category: categories[2]._id,
      price: 16.99,
      quantity: 500,
    },
  ]);

  console.log("products seeded");

  await Review.deleteMany();

  const reviews = await Review.insertMany([
      {
        user: users[0]._id,
        product: products[0]._id,
        rating: 4,
        comment: "This coffee is amazing!, It has a light and refreshing taste that i really enjoy."
      },
      {
        user: users[1]._id,
        product: products[1]._id,
        rating: 5,
        comment: "Amazing coffee, best i've ever had!."
      }
  ])
  console.log('Type of reviews:', Array.isArray(reviews) ? 'Array' : typeof reviews);

  console.log('reviews Seeded');


  // reserved for order seed
  // const orderSeedData = [
  //   {

  //   }
  // ];

  process.exit();
});

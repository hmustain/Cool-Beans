const db = require("./connection");
const { User, Collection, Product } = require("../models");

const userSeedData = [
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
];

const collectionSeedData = [
  {
    name: "LightRoast",
  },
  {
    name: "mediumRoast",
  },
  {
    name: "darkRoast",
  },
];

const productSeedData = [
  {
    name: "Light Roast 1",
    description: "This is a sample product",
    image: "/client/images/light-roast-coffee.jpg",
    category: "LightRoast",
    price: 14.99,
    quantity: 500
  },
  {
    name: "Light Roast 2",
    description: "This is a sample product",
    image: "/client/images/light-roast-coffee.jpg",
    category: "LightRoast",
    price: 14.99,
    quantity: 500
  },
  {
    name: "Light Roast 3",
    description: "This is a sample product",
    image: "/client/images/light-roast-coffee.jpg",
    category: "LightRoast",
    price: 14.99,
    quantity: 500
  },
  {
    name: "Medium Roast 1",
    description: "This is a sample product",
    image: "/client/images/medium-roast-coffee.jpg",
    category: "mediumRoast",
    price: 15.99,
    quantity: 500
  },
  {
    name: "Medium Roast 2",
    description: "This is a sample product",
    image: "/client/images/medium-roast-coffee.jpg",
    category: "mediumRoast",
    price: 15.99,
    quantity: 500
  },
  {
    name: "Medium Roast 3",
    description: "This is a sample product",
    image: "/client/images/medium-roast-coffee.jpg",
    category: "mediumRoast",
    price: 15.99,
    quantity: 500
  },
  {
    name: "Dark Roast 1",
    description: "This is a sample product",
    image: "/client/images/dark-roast-coffee.jpg",
    category: "darkRoast",
    price: 16.99,
    quantity: 500
  },
  {
    name: "Dark Roast 2",
    description: "This is a sample product",
    image: "/client/images/dark-roast-coffee.jpg",
    category: "darkRoast",
    price: 16.99,
    quantity: 500
  },
  
  {
    name: "Dark Roast 3",
    description: "This is a sample product",
    image: "/client/images/dark-roast-coffee.jpg",
    category: "darkRoast",
    price: 16.99,
    quantity: 500
  },
  
]
// reserved for order seed
// const orderSeedData = [
//   {

//   }
// ];

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeedData);
    await Collection.deleteMany();
    await Collection.create(collectionSeedData);
    await Product.deleteMany({});
    await Product.insertMany(productSeedData);
    console.log("Users, collections, & products seeded successfully!");
  } catch (err) {
    console.error(err);
  }
});

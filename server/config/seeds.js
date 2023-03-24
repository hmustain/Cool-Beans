const db = require("./connection");
const { User, Collection } = require("../models");

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
    console.log("Users and collections seeded successfully!");
  } catch (err) {
    console.error(err);
  }
});

const db = require('./connection');
const { User } = require('../models');

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

db.once('open', async () => {
    try {
      await User.deleteMany({});
      await User.create(userSeedData);
      console.log("Users seeded successfully!");
    } catch (err) {
      console.error(err);
    }
  });


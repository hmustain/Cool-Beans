const db = require("./connection");
const bcrypt = require("bcrypt");
const { User, Category, Product, Review, Order } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const users = await User.insertMany([
    {
      firstName: "Caleb",
      lastName: "Carnett",
      email: "caleb@example.com",
      password: await bcrypt.hash("Password12345!", 10),
      role: "admin",
    },

    {
      firstName: "Kaikane",
      lastName: "Lacno",
      email: "kai@example.com",
      password: await bcrypt.hash("Password12345!", 10),
      role: "admin",
    },

    {
      firstName: "Hunter",
      lastName: "Mustain",
      email: "hunter@example.com",
      password: await bcrypt.hash("Password12345!", 10),
      role: "admin",
    },
  ]);

  console.log("Users Seeded");

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
      name: "Cinnamon Roast",
      description:
        "Introducing our Cinnamon Roast Coffee, a delicious blend of coffee beans infused with warm and spicy cinnamon flavors during the roasting process. Our unique blend boasts a perfect balance of nutty coffee notes and aromatic cinnamon, creating a flavorful coffee experience like no other.",
      image: "light-roast-coffee.jpg",
      category: categories[0]._id,
      price: 14.99,
      quantity: 500,
    },
    {
      name: "New England",
      description:
        "Our Cinnamon Roast Coffee features a warm and spicy flavor profile, achieved by infusing cinnamon during the roasting process. For a rich and bold coffee blend, try our New England Roast, which boasts full-bodied flavors with notes of caramel and chocolate, inspired by traditional coffee roasting methods from the Northeast region.",
      image: "light-roast-coffee.jpg",
      category: categories[0]._id,
      price: 14.99,
      quantity: 500,
    },
    {
      name: " Half City",
      description:
        "For a light and vibrant coffee blend, try our Half City roast. Our beans are roasted just enough to achieve a delicate balance between natural sweetness and acidity, resulting in a bright and lively flavor profile. Experience the perfect pick-me-up with our Half City roast, ideal for those who enjoy a refreshing and subtle coffee taste.",
      image: "light-roast-coffee.jpg",
      category: categories[0]._id,
      price: 14.99,
      quantity: 500,
    },
    {
      name: "Hazelnut",
      description:
        "Indulge in the rich and nutty flavor of our Hazelnut medium roast coffee. With notes of roasted hazelnuts and a subtle hint of sweetness, this blend is perfect for those who enjoy a smooth and creamy coffee experience. Savor the warm and comforting flavors of our Hazelnut medium roast, and let it transport you to a cozy cafe on a crisp autumn day.",
      image: "medium-roast-coffee.jpg",
      category: categories[1]._id,
      price: 15.99,
      quantity: 500,
    },
    {
      name: "Mocha",
      description:
        "Treat your taste buds to the irresistible flavor of our Mocha medium roast coffee. Featuring the perfect balance of chocolatey and coffee notes, this blend is a must-try for any mocha lover. Our beans are roasted to perfection, resulting in a smooth and velvety coffee experience that's sure to satisfy your cravings. Sip on our Mocha medium roast coffee, and let its rich and decadent flavors transport you to a world of pure coffee bliss.",
      image: "medium-roast-coffee.jpg",
      category: categories[1]._id,
      price: 15.99,
      quantity: 500,
    },
    {
      name: "Citrus",
      description:
        "Brighten up your day with the refreshing taste of our Citrus medium roast coffee. Our carefully crafted blend features subtle notes of lemon, orange, or grapefruit, providing a zesty twist to your daily coffee routine. The balanced acidity and sweetness of our beans are complemented by the bright and tangy citrus flavors, resulting in a unique and enjoyable coffee experience. Start your day off right with our Citrus medium roast coffee, and let its vibrant flavors awaken your senses.",
      image: "medium-roast-coffee.jpg",
      category: categories[1]._id,
      price: 15.99,
      quantity: 500,
    },
    {
      name: "French",
      description:
        "Experience the bold and smoky flavor of our French Roast dark roast coffee. Our expertly roasted beans are dark and shiny, giving this blend a rich and intense taste that is sure to satisfy even the most discerning coffee drinkers. With a heavy body and low acidity, our French Roast coffee boasts a complex flavor profile that is perfect for those who enjoy a strong and bold coffee experience. Savor the rich and earthy flavors of our French Roast dark roast, and let it transport you to a Parisian cafe on a misty morning.",
      image: "dark-roast-coffee.jpg",
      category: categories[2]._id,
      price: 16.99,
      quantity: 500,
    },
    {
      name: "Italian",
      description:
        "Indulge in the rich and intense flavor of our Italian Roast dark roast coffee. Our beans have been expertly roasted until they reach a dark brown color, resulting in a slightly sweet and robust coffee taste. With a full body and low acidity, this blend is perfect for those who prefer a strong and bold coffee experience. Let the deep and complex flavors of our Italian Roast dark roast coffee awaken your senses and transport you to a sun-drenched piazza in Rome.",
      image: "dark-roast-coffee.jpg",
      category: categories[2]._id,
      price: 16.99,
      quantity: 500,
    },

    {
      name: "Warhead",
      description:
        "Looking for a coffee that packs a punch? Meet our Warhead Sour Coffee - the ultimate blend for those who like their coffee with a sour twist. This blend combines the smooth and rich taste of coffee with a sour punch that's sure to wake up your taste buds. It's like the sour patch kid of coffee blends, except without the sugar rush. Our beans are roasted to perfection, ensuring a bold and flavorful cup every time. So if you're ready to take your taste buds on a wild ride, grab a cup of our Warhead Sour Coffee and get ready to feel the buzz.",
      image: "dark-roast-coffee.jpg",
      category: categories[2]._id,
      price: 5.99,
      quantity: 500,
    },
  ]);

  console.log("products seeded");

  await Review.deleteMany();

  const reviews = [];

  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < users.length; j++) {
      const rating = Math.floor(Math.random() * 5) + 1;
      let comment = "";
      switch (rating) {
        case 1:
          comment = "Terrible product.";
          break;
        case 2:
          comment = "Not very good, could be better.";
          break;
        case 3:
          comment = "It's okay, nothing special.";
          break;
        case 4:
          comment = "Pretty good, I enjoyed it.";
          break;
        case 5:
          comment = "Amazing product, would definitely recommend!";
          break;
      }
      const review = {
        user: users[j]._id,
        product: products[i]._id,
        rating,
        comment,
      };
      reviews.push(review);
    }
  }

  const createdReviews = await Review.insertMany(reviews);

  console.log(
    "Type of reviews:",
    Array.isArray(createdReviews) ? "Array" : typeof createdReviews
  );

  console.log("reviews Seeded");

  //   await Order.deleteMany();

  // console.log('users:', users);
  // console.log('products:', products);
  // console.log('categories:', categories);

  //   const orders = await Order.insertMany([
  //     {
  //       user: users[0]._id,
  //       products: [
  //         {
  //           product: products[0]._id,
  //           quantity: 1,
  //           price: products[0].price,
  //         },
  //         {
  //           product: products[1]._id,
  //           quantity: 2,
  //           price: products[1].price

  //         },
  //       ],
  //       status: "confirmed",
  //     },
  //     {
  //       user: users[1]._id,
  //       products: [
  //         {
  //           product: products[3]._id,
  //           quantity: 1,
  //           price: products[3].price
  //         },
  //         {
  //           product: products[4]._id,
  //           quantity: 3,
  //           price: products[4].price
  //         },
  //       ],
  //       status: "confirmed",
  //     },
  //   ]);

  //   console.log("orders seeded");

  process.exit();
});

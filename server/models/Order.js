const mongoose = require("mongoose");
const dateFormat = require('../utils/dateFormat');
//require mongoose and custom date formater from utils
const { Schema } = mongoose;
//create schema for order
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  products: [
    {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
  ],

  status: {
    type: String,
    name: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },

  purchaseDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

  total: {
    type: Number,
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

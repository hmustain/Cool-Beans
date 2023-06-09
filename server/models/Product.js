const mongoose = require("mongoose");
const { Schema } = mongoose;
//require mongoose and schema
//declare product schema/modle
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

console.log('Before creating Product model');
const Product = mongoose.model("Product", productSchema);
console.log('After creating Product model');

module.exports = Product;

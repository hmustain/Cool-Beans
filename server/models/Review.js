const mongoose = require("mongoose");
const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');
//import mongoose and schema
// import custom date format from utils
//create review schema
const reviewSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    }
  }, { timestamps: true });
  
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

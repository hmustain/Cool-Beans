const mongoose = require("mongoose");
// require mongoose and grab schema from it
const { Schema } = mongoose;
//create category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

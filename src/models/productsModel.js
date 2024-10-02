const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "each product must have category"],
  },
  calories: {
    type: Number,
    required: [true, "each product must have calories count "],
  },
  title: {
    type: String,
    required: [true, "each product must have title"],
  },
  image: {
    type: String,
    required: [true, "each product must have image"],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  // make refernce to the user schema
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  image: {
    type: String,
    required: true,
  },

  averageRating: {
    type: Number,
    default: 0,
  },

  isPopular: {
    type: Boolean,
    default: false,
  },

  // adding category
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productSchema);

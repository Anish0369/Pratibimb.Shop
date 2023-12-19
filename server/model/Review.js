const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
});

module.exports = mongoose.model("Review", reviewSchema);  



const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: Number,
    required: true,
    trim: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    trim: true,
  },
  isPaid: {
    type: Boolean,
    enum: [true, false], // 'enum' instead of 'enmu', and use actual boolean values
    default: false,
  },
  isDelivered: {
    type: Boolean,
    enum: [true, false], // 'enum' instead of 'enmu', and use actual boolean values
    default: false,
  },
  instructions: {
    type: String, // 'string' should be 'String'
    default: "",
    trim: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderedAt: {
    type: Date,
    default: Date.now, // Set a default value to capture the date automatically
  },
});

module.exports = mongoose.model("Order", orderSchema);

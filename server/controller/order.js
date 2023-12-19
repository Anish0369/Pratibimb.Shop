// console.log("hello world");
const Order = require("../model/Order");

// create order
exports.createOrder = async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      country,
      pincode,
      phoneNo,
      instructions,
      totalItems,
      totalAmount,
      orderItems,
    } = req.body;

    console.log(req.body);

    const userId = req.user.id;

    console.log(userId);

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !phoneNo ||
      !totalItems ||
      !totalAmount ||
      !orderItems
    ) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const orderedAtDate = new Date(); // Get the current date
    const newOrder = await Order.create({
      user: userId,
      address: address,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      phoneNo: phoneNo,
      instructions: instructions,
      totalItems: totalItems,
      totalAmount: totalAmount,
      orderItems: orderItems,
      orderedAt: orderedAtDate, // Assign the generated date to the orderedAt field
    });

    console.log(newOrder);

    if (!newOrder) {
      return res.status(400).json({
        success: false,
        message: "Unable to create order",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create order",
    });
  }
};

// get order by id
exports.getOrderById = async (req, res) => {
  try {
    const oid = req.params.id;

    const orderDetails = await Order.findById(oid).populate(
      "orderItems.product"
    );

    if (!orderDetails) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      orderDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch order",
    });
  }
};

// mark order paid
exports.orderPaid = async (req, res) => {
  try {
    const oid = req.params.id;

    const reqOrder = await Order.findById(oid);

    if (!reqOrder) {
      res.status(404).json({
        success: false,
        message: "Not able to find the order",
      });
    }

    reqOrder.isPaid = true;

    const response = await reqOrder.save();

    if (!response) {
      res.status(400).json({
        success: false,
        message: "Unable to update the order",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order paid successfully",
      response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order is not paid",
    });
  }
};

exports.orderDelivered = async (req, res) => {
  try {
    const oid = req.params.id;

    const reqOrder = await Order.findById(oid);

    if (!reqOrder) {
      res.status(404).json({
        success: false,
        message: "Not able to find the order",
      });
    }

    reqOrder.isDelivered = true;

    const response = await reqOrder.save();

    if (!response) {
      res.status(400).json({
        success: false,
        message: "Unable to update the order",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Deleivered successfully",
      response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order is not paid",
    });
  }
};

/// get all orders admin
exports.getMyOrders = async (req, res) => {
  try {
    const uid = req.user.id;

    const reqOrder = await Order.find({ user: uid }).populate(
      "orderItems.product"
    );

    if (!reqOrder) {
      res.status(400).json({
        success: false,
        message: "Unable to find the orders",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      reqOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch the orders",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const reqOrder = await Order.find().populate("orderItems.product");

    if (!reqOrder) {
      res.status(400).json({
        success: false,
        message: "Unable to find the orders",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      reqOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch the orders",
    });
  }
};

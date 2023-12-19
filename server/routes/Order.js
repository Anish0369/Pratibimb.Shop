const express = require("express");
const router = express.Router();

const { auth, isAdmin, isUser } = require("../middleware/auz");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  orderPaid,
  orderDelivered,
  getMyOrders,
} = require("../controller/order");

// console.log("hello world");

router.post("/createorder", auth, createOrder);

router.get("/getallorders", auth, getAllOrders); // shoul add populate products

router.get(
  "/getmyorders",
  function (req, res, next) {
    console.log("hello world1");
    next();
  },
  auth,

  function (req, res, next) {
    console.log("hello world2");
    next();
  },

  getMyOrders
);

// shoul add populate products

router.get("/getorder/:id", auth, getOrderById); // should add populate products

router.put("/orderpaid/:id", auth, orderPaid);

router.put("/orderdeliverd/:id", auth, orderDelivered);

module.exports = router;

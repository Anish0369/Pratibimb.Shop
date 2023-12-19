const express = require("express");
const router = express.Router();

//these are routes for products

const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  search,
  getPopularProducts,
} = require("../controller/product");

router.get("/getallproducts", getAllProducts); // get all sab mai hoajathi   // checked

router.post("/createproduct", createProduct); // sirf admin ko karpayega

router.get("/getproduct/:id", getProduct); // har koi

router.delete("/deleteproduct/:id", deleteProduct);

/// sirf admin ko karpayega  // checked

router.get("/popular", getPopularProducts);

router.get("/search", search);

module.exports = router;

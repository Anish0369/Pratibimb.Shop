const express = require("express");
const router = express.Router();

//these are routes for categories

const { createCategory , deleteCategoryByName , deleteCategoryById , getAllCategories , getCategoryByName } = require("../controller/category");

  function helloworld(req,res,next){
    console.log("hello world");
    next();}

// badiya chal rhaa hai sab 
router.post("/createcategory" , helloworld , createCategory);     // sirf admin ko karpayega   // checked

router.delete("/deletecategorybyname" ,   helloworld , deleteCategoryByName);  // sirf admin ko karpayega  // checked

router.delete("/deletecategorybyid/:id" , deleteCategoryById);  // sirf admin ko karpayega

router.get("/getallcategories" , getAllCategories);  // har koi

router.get("/getcategorybyname" , getCategoryByName);  // har koi  // onn hold

// http://localhost:4000/api/v1/product?category=name


module.exports = router;
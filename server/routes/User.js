const express = require("express");
const router = express.Router();

const { auth, isAdmin, isUser } = require("../middleware/auz");

const {
  signup,
  login,
  sendOtp,
  deleteUser,
  resetPasswordToken,
  resetPassword,
  imageUpload,
} = require("../controller/auth");

// *****************************************************************************************************************

//                                           Auth Routes

//*******************************************************************************************************************

router.post("/signup", signup);

router.post(
  "/login",

  function (req, res, next) {
    console.log("hello world");
    next();
  },

  login
);

router.post("/sendotp", sendOtp);

router.delete("/deleteuser", auth, deleteUser);

// *****************************************************************************************************************

//                                           Profile Routes

//*******************************************************************************************************************

const { updateProfile, getProfile } = require("../controller/profile");

router.post("/updateprofile", auth, updateProfile);

function helloworld(req, res, next) {
  console.log("hello world");
  next();
}

router.get("/getprofile", auth, helloworld, getProfile);

// *****************************************************************************************************************

//                                           Whislist routes

//*******************************************************************************************************************

const { addFav, removeFav } = require("../controller/wishlist");

router.post("/addfav", auth, addFav);
router.post("/removefav", auth, removeFav);

// ****************************************************************************************************************

//                                           Review routes

//*******************************************************************************************************************

const {
  createRev,
  getAverageRating,
  getReviews,
  getReviewById,
} = require("../controller/review");

router.post("/createreview", helloworld, auth, helloworld, createRev);
router.get("/getaveragerating", getAverageRating);
router.get("/getreviews", getReviews);
router.get("/getreviewbyid/:id", getReviewById);
router.post("/imageUpload", imageUpload);

// ****************************************************************************************************************

//                                           Password routes

//*******************************************************************************************************************

router.post("/resetpasswordtoken", resetPasswordToken);

router.post("/resetpassword", resetPassword);

module.exports = router;

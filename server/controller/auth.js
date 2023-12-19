const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Profile = require("../model/Profile");
const wishlist = require("../model/Wishlist");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Otp = require("../model/Otp");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const mailsender = require("../utils/mailSender");
const cloudinary = require("cloudinary").v2;

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType, otp } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      //
      return res.status(400).json({
        success: false,
        message: "OTP is not valid",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    const profile = await Profile.create({
      age: null,
      dob: null,
      address: null,
      myPic: null,
      phoneNo: null,
      about: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      profile: profile._id,
    });

    const Wishlist = await wishlist.create({
      user: user._id,
      product: [],
    });

    console.log(Wishlist);

    if (!Wishlist) {
      return res.status(200).json({
        success: false,
        message: "wishlist is not created",
      });
    }

    console.log(user);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Anish is a great",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    console.log("1");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("2");
    if (isPasswordMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      console.log("3");
      user.token = token;
      console.log(user.token);
      user.password = undefined;
      console.log("4");
      const options = {
        httpOnly: true,
      };
      console.log("5");
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure. Please Try Again",
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpDoc = await Otp.create({
      email,
      otp,
    });

    console.log(otpDoc);

    return res.status(200).json({
      success: true,
      message: "OTP sended successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "OTP cannot be sended",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user_Id = req.user.id;

    let userDetails = await User.findById(user_Id);

    let userProfile = userDetails.profile;

    let deleteProfile = await Profile.findByIdAndDelete(userProfile);

    if (!deleteProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile is not deleted",
      });
    }

    let wishlistDetails = await wishlist.findOneAndDelete({
      user: userDetails._id,
    });

    if (!wishlistDetails) {
      return res.status(404).json({
        success: false,
        message: "Wishlist is not deleted",
      });
    }

    let deleteUser = await User.findByIdAndDelete(user_Id);

    if (!deleteUser) {
      return res.status(404).json({
        success: false,
        message: "User is not deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User is deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Not able to delete user",
    });
  }
};

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us. Enter a Valid Email `,
      });
    }

    // Generate a reset token and set resetPasswordExpires 5 minutes from now
    const token = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: resetPasswordExpires },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    // Send an email with the reset token
    await mailsender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this URL to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "Some Error in Sending the Reset Message",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }

    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );

    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    // Data fetch
    // const { name, tags, email } = req.body;
    // console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // Validation
    // const supportedTypes = ["jpg", "jpeg", "png"];
    // const fileType = file.name.split('.')[1].toLowerCase();
    // console.log("File Type:", fileType);

    // if (!isFileTypeSupported(fileType, supportedTypes)) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'File format not supported',
    //     });
    // }

    // File format supported
    console.log("Uploading to Codehelp");
    const response = await uploadFileToCloudinary(file, "Codehelp");
    console.log(response);

    // Database entry save
    // const fileData = await File.create({
    //     name,
    //     tags,
    //     email,
    //     imageUrl: response.secure_url,
    // });

    return res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// {

//   "token" : "4dcb09298c62f0b5f333e0f12dc0c092f4cb8361",
//   "password" : "123456789",
//   "confirmPassword" : "123456789"

//  }

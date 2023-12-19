const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token =
      req.cookies.Webdev ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    console.log(1);
    console.log(token);

    // token is gtting as string
    console.log(1);

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    console.log(2);

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    console.log(3);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

exports.isAdmin = (req, res) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be matching",
    });
  }
};

exports.isUser = (req, res) => {
  try {
    if (req.user.accountType !== "User") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be matching",
    });
  }
};

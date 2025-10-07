const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      message: "Please login",
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWTtoken, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist with that token/id",
      });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware or route
  });
};

module.exports = isAuthenticated;

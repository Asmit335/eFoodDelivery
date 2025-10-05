const {
  registerUser,
  loginUser,
  forgetPassword,
} = require("../controller/auth/authController");

const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpass").post(forgetPassword);

module.exports = router;

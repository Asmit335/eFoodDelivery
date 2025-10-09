const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgetPassword,
  verifyOpt,
  resetPassword,
} = require("../controller/auth/authController");
const { catchAsync } = require("../services/catchAsync");

router.route("/register").post(catchAsync(registerUser));
router.route("/login").post(catchAsync(loginUser));
router.route("/forgetpass").post(catchAsync(forgetPassword));
router.route("/verifyotp").post(catchAsync(verifyOpt));
router.route("/resetpass").post(catchAsync(resetPassword));

module.exports = router;

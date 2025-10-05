const {
  registerUser,
  loginUser,
  forgetPassword,
  verifyOpt,
  resetPassword,
} = require("../controller/auth/authController");

const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpass").post(forgetPassword);
router.route("/verifyotp").post(verifyOpt);
router.route("/resetpass").post(resetPassword);

module.exports = router;

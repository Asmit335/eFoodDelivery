const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  getMyProfile,
  deleteMyProfile,
  passwordUpdate,
} = require("../../controller/users/profile/profileController");
const router = express.Router();

router
  .route("/profile")
  .get(isAuthenticated, catchAsync(getMyProfile))
  .delete(isAuthenticated, catchAsync(deleteMyProfile));

router.route("/changepass").patch(isAuthenticated, catchAsync(passwordUpdate));

module.exports = router;

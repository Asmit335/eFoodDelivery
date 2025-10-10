const express = require("express");
const {
  getProductReview,
  createReview,
  deleteReview,
} = require("../controller/userMain/userMainController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { catchAsync } = require("../services/catchAsync");
const router = express.Router();

router
  .route("/review/:id")
  .get(getProductReview)
  .delete(isAuthenticated, catchAsync(deleteReview))
  .post(isAuthenticated, catchAsync(createReview));

module.exports = router;

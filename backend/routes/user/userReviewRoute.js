const express = require("express");

const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");

const restricTocreateProduct = require("../../middleware/restrictTocreate");
const {
  getProductReview,
  deleteReview,
  createReview,
  getMyReview,
} = require("../../controller/users/reviewofUser/reviewController");
const router = express.Router();

router.route("/reviews").get(isAuthenticated, catchAsync(getMyReview));
router
  .route("/review/:id")
  .get(getProductReview)
  .delete(isAuthenticated, catchAsync(deleteReview))
  .post(
    isAuthenticated,
    restricTocreateProduct("customer"),
    catchAsync(createReview)
  );

module.exports = router;

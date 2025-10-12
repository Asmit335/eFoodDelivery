const express = require("express");

const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  getMyReview,
  createReview,
  deleteReview,
  getProductReview,
} = require("../../controller/reviewofUser/reviewController");
const restricTocreateProduct = require("../../middleware/restrictTocreate");
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

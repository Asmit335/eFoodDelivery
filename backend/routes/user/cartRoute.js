const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { catchAsync } = require("../../services/catchAsync");
const {
  addToCart,
  getMyCartItem,
  deleteMyCartItem,
} = require("../../controller/users/cart/cartController");
const router = express.Router();

router.route("/").get(isAuthenticated, catchAsync(getMyCartItem));
router
  .route("/:id")
  .post(isAuthenticated, catchAsync(addToCart))
  .delete(isAuthenticated, catchAsync(deleteMyCartItem));

module.exports = router;
